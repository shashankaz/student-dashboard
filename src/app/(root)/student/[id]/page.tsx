"use client";

import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { students } from "@/data/students";

const StudentDetailsPage = () => {
  const params = useParams();
  const id = params.id;

  const student = students.find((s) => s.id === id);

  if (!student) {
    return (
      <div>
        <Link href="/">
          <Button className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mt-4">
          <p>Error loading student details. The student may not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link href="/">
        <Button variant="outline" className="mb-6 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{student.name}</CardTitle>
          <CardDescription className="text-lg">{student.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">{student.age} years</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Academic Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Course</p>
                  <p className="font-medium">{student.course}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Enrollment Date</p>
                  <p className="font-medium">
                    {format(new Date(student.enrollmentDate), "MMMM d, yyyy")}
                  </p>
                </div>
                {student.grade !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500">Current Grade</p>
                    <p className="font-medium">{student.grade}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDetailsPage;
