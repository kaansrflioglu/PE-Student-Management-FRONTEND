import axios from "axios";

const API_BASE = "http://localhost:8080/api";

export const getStudents = () => axios.get(`${API_BASE}/students`);

export const createStudent = (student: { name: string; age: number }) =>
  axios.post(`${API_BASE}/students`, student);

export const deleteStudent = (id: string) =>
  axios.delete(`${API_BASE}/students/${id}`);