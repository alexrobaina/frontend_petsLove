import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { Header } from '../../components/Header'

export const UserProfilePage: FC = () => {
  const { id } = useParams()
  console.log(id)

  return (
    <div className="flex justify-between">
      <header className="flex gap-5">
        <Header title="Profile" canBack />
      </header>
    </div>
  )
}
