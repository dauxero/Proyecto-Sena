import axios from "axios";

const API_URL = "http://localhost:5001/api/auth";

export const login = async (
  email: string,
  password: string
): Promise<{ token: string; role: string }> => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const removeToken = (): void => {
  localStorage.removeItem("token");
};
