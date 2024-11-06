import axios from "axios";
import { getToken } from "./authService";

const API_URL = "http://localhost:5001/api/users";

const authHeader = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

export const getUsers = async () => {
  const response = await axios.get(API_URL, authHeader());
  return response.data;
};

export const addUser = async (user: {
  email: string;
  password: string;
  role: string;
}) => {
  const response = await axios.post(API_URL, user, authHeader());
  return response.data;
};

export const updateUser = async (
  id: string,
  user: { email: string; role: string }
) => {
  const response = await axios.put(`${API_URL}/${id}`, user, authHeader());
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, authHeader());
  return response.data;
};
