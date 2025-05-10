import type { Metadata } from "next";
import { students } from "@/data/students";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const student = students.find((s) => s.id === id);
  const title = student
    ? `${student.name} | Student Details`
    : `Student Not Found`;
  const description = student
    ? `View details for ${student.name} (ID: ${id}).`
    : `No student found with ID ${id}.`;
  return {
    title,
    description,
  };
}

const StudentPageLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default StudentPageLayout;
