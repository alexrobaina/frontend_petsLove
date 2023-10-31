export interface IPetCardProps {
  id: string
  age: string
  name: string
  city?: string
  gender: string
  images: string[]
  goToProfile: (id: string) => void
}

export type PetCardType = {
  id: string
  age: string
  name: string
  location?: {
    city?: string
  }
  gender: string
  images: string[]
  goToProfile: (id: string) => void
}

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
  MedicalRecord: {
    id: string
    petId: string
    Pet: string
    date: Date
    description: string
    diagnosis: string
    treatment: string
    medications: string[]
    followUpRequired: boolean
    followUpDate: Date
    veterinarian: string
    clinicName: string
    notes: string
    attachments: string[]
    createdAt: Date
    updatedAt: Date
  }
}
