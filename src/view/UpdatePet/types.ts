import { FormikErrors } from 'formik';
import { ChangeEvent } from 'react';

export type TValues = {
  birthday: string;
  name: string;
  images: any;
  sex: string;
  country: string;
  city: string;
  textAddress: string;
  location: {
    lat: number;
    lng: number;
  };
  adopted: boolean;
  adopterUserEmail: string;
  category: string;
  medicalNotes: any;
  newImages: any;
  description: string;
  titleMedicalNote: string;
  detailMedicalNote: string;
};

export type TUpdatePetSlice = {
  _id: string;
  images: any;
  birthday: string;
  name: string;
  newImages: any;
  sex: string;
  adopted: boolean;
  category: string;
  imageDeleted: any;
  medicalNotes: any;
  country: string;
  city: string;
  textAddress: string;
  location: {
    lat: number;
    lng: number;
  };
  description: string;
  adopterUser: string;
  usersAdoptedEmailOptions: {
    value: string;
    label: string;
  };
};

export interface IUpdatePetFormProps {
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

export interface IUpdatePet {
  petId?: string;
}
