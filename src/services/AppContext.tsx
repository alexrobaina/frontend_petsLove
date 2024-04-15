import { createContext } from 'react'

export interface User {
  address: string | null
  createdAt: Date
  email: string
  id: string
  image: string | null
  phone: null | null
  role: null | null
  socialMedia: null | null
  updatedAt: string
  username: string | null
}

export interface AppContextProps {
  session: { token: string } | null
  user: User | null
}

const warning: AppContextProps = {
  get session(): { token: string } {
    console.warn('Accessed context.session without context provider.')
    return { token: '' }; // Return a default value
  },
  get user(): User {
    console.warn('Accessed context.user without context provider.')
    return {
      id: '',
      email: '',
      image: '',
      role: null,
      address: '',
      phone: null,
      username: '',
      updatedAt: '',
      socialMedia: null,
      createdAt: new Date(),
    }
  },
}

export const AppContext = createContext<AppContextProps>(warning)
