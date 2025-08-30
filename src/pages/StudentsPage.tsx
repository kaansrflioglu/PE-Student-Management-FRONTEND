import React, { useEffect, useState } from "react";
import StudentList from "../components/StudentList";
import { useNavigate } from "react-router-dom";
import type { Student } from "../types/student";
import { useAuth } from "../contexts/AuthContext";
import { getStudents } from "../api/studentApi";

const StudentsPage: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);

  if (!token) {
    console.warn("Auth yapılmamış, yönlendiriliyor...");
    navigate("/login");
    return null;
  }

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getStudents(token);
        setStudents(res.data);
      } catch (err) {
        console.warn("ADMIN rolünde bir kullanıcı ile giriş yapınız.");
        navigate("/login");
      }
    };

    fetchStudents();
  }, [token, navigate]);

  return (
    <div>
      <h1>Students</h1>
      <StudentList students={students} />
    </div>
  );
};

export default StudentsPage;