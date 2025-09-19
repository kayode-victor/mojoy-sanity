import GoogleProvider from "next-auth/providers/google";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { sClient, client } from "@/lib/sanityClient";
import nodemailer from "nodemailer";

// Reusable function to send welcome email
async function sendWelcomeEmail(email: string, name: string | null) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.AWS_SES_SMTP_HOST,
      port: Number(process.env.AWS_SES_SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.AWS_SES_SMTP_USER,
        pass: process.env.AWS_SES_SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: '"MojoYICL" <noreply@mojoyicl.com>',
      to: email,
      subject: "Welcome to MojoYICL!",
      html: `
        <div style="font-family: 'Poppins', sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px;">
          <h1 style="font-family: 'Montserrat', sans-serif; font-size: 24px; color: #1a73e8;">
            Welcome, ${name || "Customer"}!
          </h1>
          <p style="font-size: 16px; line-height: 1.5;">
            Thank you for joining MojoYICL${
              name ? " with Google" : ""
            }. Explore our wide range of laptops and enjoy seamless shopping!
          </p>
          <a
            href="${process.env.NEXTAUTH_URL}"
            style="display: inline-block; background: #1a73e8; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;"
          >
            Start Shopping
          </a>
          <p style="font-size: 14px; color: #666;">
            If you have any questions, contact us at mojoyicl@gmail.com.
          </p>
        </div>
      `,
    });
  } catch (error: any) {
    console.error("Welcome email error:", {
      message: error.message,
      stack: error.stack,
    });
    // Don't throw; email failure shouldn't block signup
  }
}

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" }, // For sign-up
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Check if user exists in Sanity
        const userQuery = `*[_type == "user" && email == $email][0] {
          _id,
          name,
          email,
          password
        }`;
        const user = await client.fetch(userQuery, {
          email: credentials.email,
        });

        if (!user) {
          // Sign-up: Create new user
          if (credentials.name) {
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const newUser = {
              _type: "user",
              name: credentials.name,
              email: credentials.email,
              password: hashedPassword,
              createdAt: new Date().toISOString(),
            };

            const createdUser = await sClient.create(newUser);
            return {
              id: createdUser._id,
              name: createdUser.name,
              email: createdUser.email,
            };
          }
          throw new Error("User not found. Please sign up.");
        }

        // Sign-in: Verify password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup", // Custom sign-up page
  },
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === "google" && user.email) {
        // Check if user exists in Sanity
        let sanityUser = await client.fetch(
          `*[_type == "user" && email == $email][0]`,
          { email: user.email }
        );

        if (!sanityUser) {
          // Create user in Sanity
          sanityUser = await sClient.create({
            _type: "user",
            email: user.email,
            name: user.name || "",
            createdAt: new Date().toISOString(),
            // No password for Google users
          });

          // Send welcome email
          await sendWelcomeEmail(user.email, user.name);
        }
      }

      return true;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token.sub) {
        if (!session.user) session.user = {};
        session.user.id = token.sub; // Add user ID to session
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
