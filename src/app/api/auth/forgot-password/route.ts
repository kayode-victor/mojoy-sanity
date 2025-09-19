import { NextResponse } from "next/server";
import { client, sClient } from "@/lib/sanityClient";
import nodemailer from "nodemailer";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const userQuery = `*[_type == "user" && email == $email][0]`;
    const user = await client.fetch(userQuery, { email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const token = nanoid(32);
    // Delete existing tokens
    // Find existing password reset tokens for this user and delete them
    const tokensToDelete = await sClient.fetch(
      `*[_type == "passwordResetToken" && user._ref == $userId]._id`,
      { userId: user._id }
    );
    for (const tokenId of tokensToDelete) {
      await sClient.delete(tokenId);
    }

    await sClient.create({
      _type: "passwordResetToken",
      user: { _type: "reference", _ref: user._id },
      token,
      expiresAt: new Date(Date.now() + 3600000), // 1 hour
    });

    const transporter = nodemailer.createTransport({
      host: process.env.AWS_SES_SMTP_HOST,
      port: Number(process.env.AWS_SES_SMTP_PORT),
      secure: true, // Use STARTTLS
      auth: {
        user: process.env.AWS_SES_SMTP_USER,
        pass: process.env.AWS_SES_SMTP_PASS,
      },
    });
    const URL = process.env.NEXTAUTH_URL;

    await transporter.sendMail({
      from: '"Mojoyicl" <noreply@mojoyicl.com>', // Verified SES sender
      to: email,
      subject: "Reset Your Password",
      html: `
        <p>Click <a href="${URL}/auth/reset-password?token=${token}">here</a> to reset your password.</p>
        <p>This link expires in 1 hour.</p>
      `,
    });

    return NextResponse.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
