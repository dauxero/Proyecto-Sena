import axios from "axios";
import { getToken } from "./authService";

const API_URL = "http://localhost:5001/api/inventory";

const authHeader = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

export const registerEntry = async (productId: string, quantity: number) => {
  const response = await axios.post(
    `${API_URL}/entry`,
    { productId, quantity },
    authHeader()
  );
  return response.data;
};

export const registerExit = async (productId: string, quantity: number) => {
  const response = await axios.post(
    `${API_URL}/exit`,
    { productId, quantity },
    authHeader()
  );
  return response.data;
};

export const getInventoryHistory = async () => {
  const response = await axios.get(`${API_URL}/history`, authHeader());
  return response.data;
};
