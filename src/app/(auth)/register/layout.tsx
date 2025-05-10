import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Register a new account",
};

interface RegisterLayoutProps {
  children: React.ReactNode;
}

const RegisterLayout = ({ children }: RegisterLayoutProps) => {
  return <div>{children}</div>;
};

export default RegisterLayout;
