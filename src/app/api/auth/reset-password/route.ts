// app/api/auth/reset-password/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sClient, client } from "@/lib/sanityClient";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const tokenQuery = `*[_type == "passwordResetToken" && token == $token][0] {
      _id,
      user->{
        _id,
        email
      },
      expiresAt
    }`;
    const tokenData = await client.fetch(tokenQuery, { token } as Record<
      string,
      string
    >);

    if (!tokenData) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    if (new Date(tokenData.expiresAt) < new Date()) {
      return NextResponse.json({ error: "Token expired" }, { status: 400 });
    }

    return NextResponse.json({ message: "Token valid" });
  } catch (error: any) {
    console.error("Validate token error:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: "Failed to validate token" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Missing token or password" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const tokenQuery = `*[_type == "passwordResetToken" && token == $token][0] {
      _id,
      user->{
        _id,
        email
      },
      expiresAt
    }`;
    const tokenData = await client.fetch(tokenQuery, { token });

    if (!tokenData) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    if (new Date(tokenData.expires) < new Date()) {
      return NextResponse.json({ error: "Token expired" }, { status: 400 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    await sClient
      .patch(tokenData.user._id)
      .set({ password: hashedPassword })
      .commit();

    // Delete used token
    await sClient.delete(tokenData._id);

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error: any) {
    console.error("Reset password error:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}
