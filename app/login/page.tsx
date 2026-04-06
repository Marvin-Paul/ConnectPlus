import AuthLayout from "@/components/auth/auth-layout";
import LoginForm from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Connect+",
  description: "Sign in to stays updated on your professional world and manage your connections.",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
