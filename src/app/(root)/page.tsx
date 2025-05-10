"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StudentCard from "@/components/StudentCard";
import { useAuth } from "@/context/AuthContext";
import { students } from "@/data/students";

const COURSES = [
  "All Courses",
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
];

const HomePage = () => {
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useAuth();

  const filteredStudents = students.filter(
    (student) =>
      (selectedCourse === "All Courses" || student.course === selectedCourse) &&
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Student Dashboard</h2>
        <p className="text-gray-600">Manage and view all students</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="w-full md:w-2/3 relative">
          <Input
            className="pl-10"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="size-4 text-gray-400" />
          </div>
        </div>

        <div className="w-full md:w-1/3 flex items-center gap-4">
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              {COURSES.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {currentUser && (
            <Link href="/add-student">
              <Button>Add New Student</Button>
            </Link>
          )}
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 p-8 rounded-md text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No students found
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm
              ? "No students match your search criteria."
              : selectedCourse !== "All Courses"
              ? `No students enrolled in ${selectedCourse}.`
              : "There are no students in the system yet."}
          </p>
          {currentUser && (
            <Link href="/add-student">
              <Button>Add Your First Student</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
