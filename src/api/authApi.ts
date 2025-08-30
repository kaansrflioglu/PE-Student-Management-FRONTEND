import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    role: string;
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axios.post(`${API_URL}/login`, data);
    const { token, role } = response.data;
    return { token, role };
};


export const register = async (data: LoginRequest): Promise<string> => {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
};