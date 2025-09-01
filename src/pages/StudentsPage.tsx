import React, { useEffect, useState } from "react";
import StudentList from "../components/StudentList";
import type { Student } from "../types/student";
import { useAuth } from "../contexts/AuthContext";
import { getStudents } from "../api/studentApi";
import { useNavigate } from "react-router-dom";

const StudentsPage: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getStudents(token!);
        setStudents(res.data);
      } catch (err) {
        console.warn("ADMIN rolünde bir kullanıcı ile giriş yapınız.");
        navigate("/login");
      }
    };

    fetchStudents();
  }, [token, navigate]);

  return (
    <div className="container py-4">
      <StudentList students={students} />
    </div>
  );


};

export default StudentsPage;