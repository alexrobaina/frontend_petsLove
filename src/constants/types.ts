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
