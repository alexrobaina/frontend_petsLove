import axios from "axios";
import { BASE_URL } from "./config";

export const updateUser = async (data: any) => {
  const { data: response } = await axios.put(
    `${BASE_URL}/api/user/update`,
    data
  );
  return response.data;
};

export const getUser = async () => {
  const { data: response } = await axios.get(`${BASE_URL}/api/user/user`);
  return response.data;
};

export const getDashboardData = async () => {
  const { data: response } = await axios.get(`${BASE_URL}/api/user/dashboard`);
  return response.data;
};

export const getUserRole = async (role: string) => {
  const { data: response } = await axios.get(`${BASE_URL}/api/user/${role}`);
  return response.data;
};
