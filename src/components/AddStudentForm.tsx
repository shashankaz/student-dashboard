"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import type { Student } from "@/types/types";
import { COURSES } from "@/constants/courses";

const AddStudentForm: React.FC<{
  onAddStudent?: (student: Student) => void;
}> = ({ onAddStudent }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
    enrollmentDate: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (value: string) => {
    setFormData((prev) => ({ ...prev, course: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        toast.error("Please enter a valid email address");
        return;
      }
      const age = parseInt(formData.age);
      if (isNaN(age) || age <= 0) {
        toast.error("Please enter a valid age");
        return;
      }
      if (onAddStudent) {
        onAddStudent({
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          age: age,
          course: formData.course,
          enrollmentDate: formData.enrollmentDate,
        });
      }
      toast.success("Student added successfully");
      setFormData({
        name: "",
        email: "",
        age: "",
        course: "",
        enrollmentDate: new Date().toISOString().split("T")[0],
      });
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Student</CardTitle>
        <CardDescription>
          Fill out the form to add a new student
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              type="number"
              placeholder="20"
              min="1"
              value={formData.age}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Select
              value={formData.course}
              onValueChange={handleCourseChange}
              required
            >
              <SelectTrigger className="w-full" disabled={loading}>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {COURSES.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="enrollmentDate">Enrollment Date</Label>
            <Input
              id="enrollmentDate"
              name="enrollmentDate"
              type="date"
              value={formData.enrollmentDate}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between mt-4">
          <Link href="/">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Student"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddStudentForm;
