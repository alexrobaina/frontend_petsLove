import axios from "axios";

export const getPetAnalytics = async (userId: string) => {
  const { data } = await axios.get(`/api/v1/analytics/${userId}`);
  return data;
};
