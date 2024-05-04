export interface User {
  id: string
  username: string
  firstName?: string
  lastName?: string
  email?: string
  role?: string
  description?: string
  image?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any // For allowing other string key properties
  locationId?: string
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
  image: '',
  email: '',
  description: '',
  deleteFiles: '',
  role: '',
  locationId: '',
  socialMedia: {},
}
