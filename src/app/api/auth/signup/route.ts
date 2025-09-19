// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { client, sClient } from "@/lib/sanityClient";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { z } from "zod";

// Validation schema
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required").optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = schema.parse(body);

    // Check if user exists
    const existingUser = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    );
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in Sanity
    const user = await sClient.create({
      _type: "user",
      email,
      password: hashedPassword,
      name: name || "",
      createdAt: new Date().toISOString(),
    });

    // Send welcome email
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
            Thank you for joining MojoYICL. Explore our wide range of laptops and enjoy seamless shopping!
          </p>
          <a
            href=${process.env.NEXTAUTH_URL}
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

    return NextResponse.json(
      { message: "Signup successful, welcome email sent" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", {
      message: error.message,
      stack: error.stack,
    });
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Failed to sign up" }, { status: 500 });
  }
}
