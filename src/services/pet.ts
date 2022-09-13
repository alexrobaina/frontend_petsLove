import axios from "axios";
import { BASE_URL } from "./config";

export const createPet = async (data: any) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]: any) => {
    const conditionsType = [
      "newImages",
      "images",
      "medicalNotes",
      "adopted",
      "titleMedicalNotes",
      "detailMedicalNotes",
    ];

    if (!conditionsType.includes(key)) {
      formData.append(key, value);
    }
  });

  if (data.medicalNotes) {
    data.medicalNotes.forEach((note: any) => {
      formData.append("medicalNotes", JSON.stringify(note));
    });
  }

  if (data.newImages.length > 0) {
    Object.entries(data.newImages).forEach(([key, value]: any) => {
      formData.append("newImages", value);
    });
  }

  const { data: response } = await axios.post(
    `${BASE_URL}/api/pet/create`,
    formData
  );
  return response.data;
};

export const getPets = async () => {
  const { data: response } = await axios.get(`${BASE_URL}/api/pet/allPets`);
  return response;
};

type GetFilterPets = {
  sex: string;
  city?: string;
  name?: string;
  page?: number;
  country?: string;
  category: string;
  adopted: boolean;
};

export const getFilterPets = async ({
  sex,
  page,
  city,
  name,
  country,
  category,
  adopted,
}: GetFilterPets) => {
  const { data: response } = await axios.get(
    `${BASE_URL}/api/pet/filterPets?sex=${sex}&city=${city}&country=${country}&category=${category}&page=${page}&adopted=${adopted}&name=${name}`
  );
  return response;
};
export const getUserFiltersPets = async ({
  sex,
  page,
  city,
  name,
  country,
  category,
  adopted,
}: GetFilterPets) => {
  const { data: response } = await axios.get(
    `${BASE_URL}/api/pet/filterUserPets?sex=${sex}&city=${city}&country=${country}&category=${category}&page=${page}&adopted=${adopted}&name=${name}`
  );
  return response;
};
