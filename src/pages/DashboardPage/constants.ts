import * as Yup from 'yup'

export const SIZE_PETS = [
  {
    label: 'Small',
    value: 'small',
  },
  {
    label: 'Medium',
    value: 'medium',
  },
  {
    label: 'Large',
    value: 'large',
  },
  {
    label: 'Extra large',
    value: 'extraLarge',
  },
]

export const MASS_UNIT = [
  {
    label: 'Kg',
    value: 'kg',
  },
  {
    label: 'Lb',
    value: 'lib',
  },
]

export const AGE_PETS = [
  {
    label: 'Baby',
    value: 'Baby',
  },
  {
    label: 'Young',
    value: 'young',
  },
  {
    label: 'Adult',
    value: 'adult',
  },
  {
    label: 'Senior',
    value: 'senior',
  },
]

export const CATEGORY_PET = [
  {
    label: 'Dog',
    value: 'dog',
  },
  {
    label: 'Cat',
    value: 'cat',
  },
  {
    label: 'Bird',
    value: 'bird',
  },
  {
    label: 'Rabbit',
    value: 'rabbit',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

export const GENDER_PET = [
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Male',
    value: 'male',
  },
]

export const INITIAL_VALUES_CREATE_PET = {
  age: '',
  name: '',
  units: '',
  gender: '',
  weight: '',
  size: '',
  breed: '',
  locationId: '',
  description: '',
  veterinaryId: '',
  shelterId: '',
  adopterId: '',
  medication: [],
  category: '',
}

export interface ICreatePetForm {
  age: string
  name: string
  units: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any // For allowing other string key properties
  gender: string
  weight: string
  size: string
  breed: string
  description: string
  shelterId: string
  adoptedBy: string
  category: string
}

export interface IErrorsCreatePetForm {
  age: ''
  name: ''
  units: ''
  gender: ''
  weight: ''
  size: ''
  breed: ''
  description: ''
  shelterId: ''
  adoptedBy: ''
  category: ''
}

export const INITIAL_STATE = {
  age: '',
  name: '',
  units: '',
  gender: '',
  weight: '',
  size: '',
  locationId: '',
  breed: '',
  description: '',
  shelterId: '',
  adoptedBy: '',
  category: '',
  newImages: [],
  images: {},
}

export const petSchema = Yup.object().shape({
  age: Yup.string().required('Age is required'),
  name: Yup.string().required('Name is required'),
  units: Yup.string().required('Units are required'),
  gender: Yup.string().required('Gender is required'),
  weight: Yup.string().required('Weight is required'),
  size: Yup.string().required('Size is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
})

export type FileType = {
  file: File
  url: string
  isNew: boolean
  isDeleted?: boolean
}
