import axios from "axios";
import type { Student } from "../types/student";

const API_URL = "http://localhost:8080/api/students";

export const getStudents = (token: string) => {
  return axios.get<Student[]>(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getStudentById = (id: string, token: string) => {
  return axios.get<Student>(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};