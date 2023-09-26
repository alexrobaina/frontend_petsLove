export interface User {
  id: string
  username: string
  firstName: string
  lastName: string
  email?: string
  role: string
  image?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any // For allowing other string key properties
  locationId: string
  location: {
    country: string
    city: string
    address: string
    lat: number
    lng: number
  }
  socialMedia: {
    facebook?: string
    instagram?: string
    whatsapp?: string
    telegram?: string
  }
}

export const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  username: '',
  role: '',
  location: {
    country: '',
    city: '',
    address: '',
    lat: 0,
    lng: 0,
  },
  socialMedia: {},
}
