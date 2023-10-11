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
  }
  age: string
  createdAt: Date
  updatedAt: Date
  adoptedBy: string
  Adopter: string
  Shelter: string
  vaccines: {
    id: String
    name: string
    description: string
    vaccinesStatus: boolean
    createdAt: Date
    updatedAt: Date
    PetVaccines: string[]
  }

  PetsCaredByVolunteer: string
  MedicalRecord: {
    id: String
    petId: String
    Pet: String
    date: Date
    description: String
    diagnosis: String
    treatment: String
    medications: String[]
    followUpRequired: Boolean
    followUpDate: Date
    veterinarian: String
    clinicName: String
    notes: String
    attachments: String[]
    createdAt: Date
    updatedAt: Date
  }
}
