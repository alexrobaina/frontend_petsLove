export interface IPetCardProps {
  id: string
  age: string
  name: string
  city?: string
  images?: string
  category?: string
  country?: string
  goToProfile: (id: string) => void
}

export type PetCardType = {
  id: string
  age: string
  name: string
  category: string
  location?: {
    city?: string
    country?: string
  }
  images: string
  goToProfile: (id: string) => void
}
