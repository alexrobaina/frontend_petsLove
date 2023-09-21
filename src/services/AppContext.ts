import * as React from 'react'

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
    throw new Error('Accessed context.session without context provider.')
  },
  get user(): User {
    console.warn('Accessed context.user without context provider.')
    throw new Error('Accessed context.user without context provider.')
  },
}

export const AppContext = React.createContext<AppContextProps>(warning)
