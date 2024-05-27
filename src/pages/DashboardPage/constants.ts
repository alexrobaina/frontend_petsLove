import * as Yup from 'yup'

export const SIZE_PETS = [
  {
    label: 'sizePet.small',
    value: 'small',
  },
  {
    label: 'sizePet.medium',
    value: 'medium',
  },
  {
    label: 'sizePet.large',
    value: 'large',
  },
  {
    label: 'sizePet.extraLarge',
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
    label: 'agePet.baby',
    value: 'baby',
  },
  {
    label: 'agePet.young',
    value: 'young',
  },
  {
    label: 'agePet.adult',
    value: 'adult',
  },
  {
    label: 'agePet.senior',
    value: 'senior',
  },
]

export const CATEGORY_PET = [
  {
    label: 'categoryPet.dog',
    value: 'dog',
  },
  {
    label: 'categoryPet.cat',
    value: 'cat',
  },
  {
    label: 'categoryPet.bird',
    value: 'bird',
  },
  {
    label: 'categoryPet.rabbit',
    value: 'rabbit',
  },
  {
    label: 'categoryPet.exotic',
    value: 'exotic',
  },
]

export const GENDER_PET = [
  {
    label: 'genderPet.female',
    value: 'female',
  },
  {
    label: 'genderPet.male',
    value: 'male',
  },
]

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
  adopted: 'false',
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
  age: Yup.string().required('ageIsRequired'),
  name: Yup.string().required('nameIsRequired'),
  units: Yup.string().required('unitsIsRequired'),
  gender: Yup.string().required('genderIsRequired'),
  weight: Yup.string().required('weightIsRequired'),
  size: Yup.string().required('sizeIsRequired'),
  description: Yup.string().required('descriptionIsRequired'),
  category: Yup.string().required('categoryIsRequired'),
})

export type FileType = {
  file: File
  url: string
  isNew: boolean
  isDeleted?: boolean
}
