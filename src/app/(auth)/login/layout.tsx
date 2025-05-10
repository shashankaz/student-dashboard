import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return <div>{children}</div>;
};

export default LoginLayout;
