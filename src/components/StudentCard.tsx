import Link from "next/link";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Student } from "@/types/types";

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{student.name}</CardTitle>
        <CardDescription>{student.email}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Age:</span>
            <span>{student.age}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Course:</span>
            <span>{student.course}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Enrolled:</span>
            <span>
              {format(new Date(student.enrollmentDate), "MMM d, yyyy")}
            </span>
          </div>
          {student.grade !== undefined && (
            <div className="flex justify-between">
              <span className="text-sm font-medium">Grade:</span>
              <span>{student.grade}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/student/${student.id}`}>
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default StudentCard;
