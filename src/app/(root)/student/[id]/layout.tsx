import { Metadata } from "next";
import { students } from "@/data/students";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const student = students.find((s) => s.id === params.id);
  const title = student
    ? `${student.name} | Student Details`
    : `Student Not Found`;
  const description = student
    ? `View details for ${student.name} (ID: ${params.id}).`
    : `No student found with ID ${params.id}.`;
  return {
    title,
    description,
  };
}

interface StudentPageLayoutProps {
  children: React.ReactNode;
}

const StudentPageLayout = ({ children }: StudentPageLayoutProps) => {
  return <div>{children}</div>;
};

export default StudentPageLayout;
