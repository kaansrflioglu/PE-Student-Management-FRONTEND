import axios from "axios";
import type { Parent } from "../types/parent";

const API_URL = "http://localhost:8080/api/parents";

export const getParents = (token: string) => {
  return axios.get<Parent[]>(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getParentById = (id: string, token: string) => {
  return axios.get<Parent>(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateParent = (id: string, parent: Parent, token: string) => {
  return axios.put<Parent>(`${API_URL}/${id}`, parent, {
    headers: { Authorization: `Bearer ${token}` },
  });
};