import axios from "axios";

const API_BASE = "http://localhost:8080/api";

const axiosInstance = axios.create({
    baseURL: API_BASE,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getStudents = () => axiosInstance.get("/students");

export const createStudent = (student: { name: string; age: number }) =>
  axiosInstance.post("/students", student);

export const deleteStudent = (id: string) =>
  axiosInstance.delete(`/students/${id}`);