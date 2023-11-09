export type PetDetail = {
  id: string
  name: string
  qrCode: string
  category: string
  weight: string
  breed: string
  description: string
  gender: string
  adopted: boolean
  images: string[]
  size: string
  location: {
    city: string
    country: string
  }
  age: string
  createdAt: Date
  updatedAt: Date
  adoptedBy: string
  Adopter: {
    email: string
    firstName: string
    id: string
    image: string
    username: string
    description: string
  }
  Shelter: {
    id: string
    firstName: string
    email: string
    image: string
    username: string
    description: string
  }
  PetVaccine: {
    id: string
    name: string
    description: string
    vaccinesStatus: boolean
    createdAt: Date
    updatedAt: Date
    PetVaccines: string[]
  }
  MedicalRecord: IMedicalRecord[]
}

export interface IMedicalRecord {
  id: string
  title: string
  description: string
  diagnosis: string
  treatment: string
  medications: string[]
  followUpRequired: boolean
  followUpDate: string
  vetId: string
  clinicName: string
  notes: string
  attachments: string[]
  createdAt: string
  updatedAt: string
}

export interface IVaccine {
  vaccine?: {
    id: string
    name: string
    description: string
  }
  Vaccine?: {
    id: string
    name: string
    description: string
  }
  status: string
}
