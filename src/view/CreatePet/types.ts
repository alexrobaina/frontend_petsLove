import { FormikErrors } from "formik";
import { ChangeEvent } from "react";

export type TValues = {
  birthday: string;
  lat: number;
  lng: number;
  name: string;
  city: string;
  images: any;
  sex: string;
  country: string;
  adopted: boolean;
  adopterUserEmail: string;
  category: string;
  medicalNotes: any;
  newImages: any;
  description: string;
  textAddress: string;
  titleMedicalNote: string;
  detailMedicalNote: string;
};

export type TCreatePetSlice = {
  _id: string;
  images: any;
  birthday: string;
  name: string;
  city: string;
  newImages: any;
  sex: string;
  country: string;
  adopted: boolean;
  category: string;
  imageDeleted: any;
  medicalNotes: any;
  description: string;
  textAddress: string;
  adopterUser: string;
  usersAdoptedEmailOptions: {
    value: string;
    label: string;
  };
  lat: number;
  lng: number;
};

export interface ICreatePetFormProps {
  testId: string;
  adopterId: string;
  submitForm: any;
  isLoading: boolean;
  values: TValues;
  oldImages: any[];
  handleUploadPhoto: any;
  titlePage: string;
  setFieldValue: any;
  usersVetEmailList: any[];
  goToDashboard: () => void;
  usersAdoptedEmailOptions: any[];
  errors: FormikErrors<TValues>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDeleteImages: (image: string, oldImages: any) => void;
  canBeChangeAdoptedStatus: () => boolean;
}

export interface ICreatePet {
  petId?: string;
}
