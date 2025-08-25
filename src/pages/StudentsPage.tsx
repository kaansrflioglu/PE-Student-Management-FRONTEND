import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentList from "../components/StudentList";
import type { Student } from "../types/student";

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    axios
      .get<Student[]>("http://localhost:8080/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  return (
    <div>
      <h1>Students</h1>
      <StudentList students={students} />
    </div>
  );
};

export default StudentsPage;