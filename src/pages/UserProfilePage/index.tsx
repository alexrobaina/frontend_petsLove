import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { useUser } from '../../hooks/user/useUser'

import { UserProfile } from './components/UserProfile'

export const UserProfilePage: FC = () => {
  const { id } = useParams()
  const { user } = useUser(id)

  return <UserProfile user={user || null} />
}
