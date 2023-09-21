import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { Header } from '../../components/Header'

export const ProfilePetPage: FC = () => {
  const { id } = useParams()
  console.log(id)

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-5">
          <Header title="Profile" canBack />
        </div>
      </div>
    </div>
  )
}
