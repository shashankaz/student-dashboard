"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import LoginForm from "@/components/forms/LoginForm";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  return (
    <div className="max-w-md mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
