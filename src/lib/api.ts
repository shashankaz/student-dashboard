import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { Student } from "@/types/types";

const COLLECTION_NAME = "students";
const studentsCollection = collection(db, COLLECTION_NAME);

export const getStudents = async (): Promise<Student[]> => {
  const snapshot = await getDocs(studentsCollection);
  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Student)
  );
};

export const getStudentById = async (id: string): Promise<Student | null> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Student;
  } else {
    return null;
  }
};

export const addStudent = async (
  student: Omit<Student, "id">
): Promise<string> => {
  try {
    const docRef = await addDoc(studentsCollection, student);
    return docRef.id;
  } catch (error) {
    console.error("Error adding student:", error, student);
    throw error;
  }
};

export const getStudentsByCourse = async (
  course: string
): Promise<Student[]> => {
  const q = query(studentsCollection, where("course", "==", course));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Student)
  );
};
