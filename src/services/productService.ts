import axios from "axios";
import { getToken } from "./authService";

const API_URL = "http://localhost:5001/api/products";

const authHeader = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

export const getProducts = async () => {
  const response = await axios.get(API_URL, authHeader());
  return response.data;
};

export const addProduct = async (product: {
  name: string;
  quantity: number;
  price: number;
}) => {
  const response = await axios.post(API_URL, product, authHeader());
  return response.data;
};

export const updateProduct = async (
  id: string,
  product: { name: string; quantity: number; price: number }
) => {
  const response = await axios.put(`${API_URL}/${id}`, product, authHeader());
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, authHeader());
  return response.data;
};
