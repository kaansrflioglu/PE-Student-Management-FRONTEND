import React, { useEffect, useState } from "react";
import StudentList from "../components/StudentList";
import type { Student } from "../types/student";
import { getStudents } from "../api/studentApi";

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStudents()
      .then((res) => setStudents(res.data))
      .catch((err) => {
        console.error("Error fetching students:", err);
        setError("Failed to load students. Make sure you are logged in.");
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Students</h1>
      <StudentList students={students} />
    </div>
  );
};

export default StudentsPage;