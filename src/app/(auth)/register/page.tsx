"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { useAuth } from "@/context/AuthContext";

const RegisterPage = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  return (
    <div className="max-w-md mx-auto my-10">
      <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
