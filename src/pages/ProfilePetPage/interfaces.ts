export type PetDetail = {
  id: string
  age: string
  size: string
  breed: string
  weight: string
  gender: string
  qrCode: string
  category: string
  description: string
  PetVaccine: IVaccine[]
  MedicalRecord: []
  Shelter: {
    id: string
    email: string
    image: string
    username: strin
    firstName: string
  }
  Adopter: {
    id: string
    email: string
    image: string
    username: string
    firstName: string
  }
  Vet: {
    id: string
    email: string
    image: string
    username: string
    firstName: string
  }
  location: {
    city: string
    country: string
  }
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
  id: string
  name: string | undefined
  description: string | undefined
  vaccine?: {
    id: string
    name: string
    description: string
  }
  Vaccine: {
    id: string
    name: string
    description: string
  }
  status: string
}
