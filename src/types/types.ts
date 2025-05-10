export interface Student {
  id?: string;
  name: string;
  email: string;
  age: number;
  course: string;
  enrollmentDate: string;
  grade?: number;
}

export interface User {
  uid: string;
  email: string | null;
}
