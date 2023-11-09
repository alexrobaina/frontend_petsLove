import { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { BaseLoading } from '../../components/BaseLoading'
import { Header } from '../../components/Header'
import { useGetPet } from '../../hooks/useGetPet'

import { PetView } from './components/PetView'
import { IVaccine } from './interfaces'

export const ProfilePetPage: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading } = useGetPet(id)

  const gotToUser = (id: string) => {
    navigate(`/user/${id}`)
  }

  const petVaccines = data?.pet?.PetVaccine?.map((vaccine: IVaccine) => {
    return {
      vaccine: vaccine.Vaccine,
      status: vaccine.status,
    }
  })

  const handleEditVaccine = (id: string) => {
    console.log(id)
  }

  const handleDeleteVaccine = (id: string) => {
    console.log(id)
  }

  const getImagesWithUrlBucket = data?.pet?.images?.map((image: string) => {
    return `${import.meta.env.VITE_BUCKET_NAME}${image}`
  })

  if (isLoading) return <BaseLoading large />

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-5">
          <Header title={data?.pet?.name} buttonBack />
        </div>
      </div>
      <PetView
        pet={data?.pet}
        gotToUser={gotToUser}
        petVaccines={petVaccines}
        handleEditVaccine={handleEditVaccine}
        handleDeleteVaccine={handleDeleteVaccine}
        getImagesWithUrlBucket={getImagesWithUrlBucket}
      />
    </>
  )
}
