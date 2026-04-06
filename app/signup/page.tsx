import AuthLayout from "@/components/auth/auth-layout";
import SignupForm from "@/components/auth/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Connect+ | Professional Network",
  description: "Create your professional account on Connect+ and connect with creators, engineers, and visionaries.",
};

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
