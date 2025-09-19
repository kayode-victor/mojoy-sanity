// app/auth/reset-password/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/blacklogo.png";

// Define form schema with Zod
const schema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setIsTokenValid(false);
      toast.error("Invalid or missing token");
      return;
    }

    const validateToken = async () => {
      try {
        const response = await fetch(`/api/auth/reset-password?token=${token}`);
        if (response.ok) {
          setIsTokenValid(true);
        } else {
          const { error } = await response.json();
          setIsTokenValid(false);
          toast.error(error || "Invalid or expired token");
        }
      } catch {
        setIsTokenValid(false);
        toast.error("Failed to validate token");
      }
    };

    validateToken();
  }, [token]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: data.password }),
      });

      if (response.ok) {
        toast.success("Password reset successfully");
        router.push("/auth/signin");
      } else {
        const { error } = await response.json();
        toast.error(error || "Failed to reset password");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isTokenValid === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 font-poppins">
        <p className="text-lg text-gray-700">Validating token...</p>
      </div>
    );
  }

  if (isTokenValid === false) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 font-poppins">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-6 text-center text-2xl font-montserrat font-bold text-gray-800">
            Invalid Token
          </h1>
          <p className="mb-4 text-center text-gray-600">
            The password reset link is invalid or has expired.
          </p>
          <Link
            href="/auth/forgot-password"
            className="block w-full rounded-md bg-blue-600 py-2 text-center text-white hover:bg-blue-700"
          >
            Request a new link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 font-poppins">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 flex justify-center">
          <Image src={logo} alt="MojoYICL Logo" width={100} height={40} />
        </div>
        <h1 className="mb-6 text-center text-2xl font-montserrat font-bold text-gray-800">
          Reset Your Password
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link href="/auth/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
