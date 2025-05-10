import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Student",
  description: "Add a new student to the system",
};

interface AddStudentLayoutProps {
  children: React.ReactNode;
}

const AddStudentLayout = ({ children }: AddStudentLayoutProps) => {
  return <div>{children}</div>;
};

export default AddStudentLayout;
