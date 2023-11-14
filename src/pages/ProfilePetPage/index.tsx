import { FC, useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { BaseLoading } from '../../components/common/BaseLoading'
import { Header } from '../../components/common/Header'
import { useDelecteVaccine } from '../../hooks/useDelecteVaccine'
import { useGetPet } from '../../hooks/useGetPet'

import { DeleteVaccineModal } from './components/DeleteVaccineModal'
import { EditVaccineModal } from './components/EditVaccineModal'
import { PetView } from './components/PetView'

export type YourImageType = {
  file: File
  url: string
  isNew: boolean
  isDeleted?: boolean
}

interface IVaccine {
  id: string
  Vaccine: {
    id: string
    name: string
    description: string
  }
  status: string
  files?: string[]
}

export const ProfilePetPage: FC = () => {
  const { id } = useParams()
  const { mutate: deleteVaccine } = useDelecteVaccine()
  const [isOpenDeleteVaccine, setIsOpenDeleteVaccine] = useState(false)

  const [vaccine, setVaccine] = useState<IVaccine>()
  const [isOpenEditVaccine, setIsOpenEditVaccine] = useState(false)
  const navigate = useNavigate()
  const { data, isLoading } = useGetPet(id)

  const gotToUser = (id: string) => {
    navigate(`/user/${id}`)
  }

  const handleEditVaccine = (data: IVaccine) => {
    setVaccine(undefined)
    setVaccine(data)
    setIsOpenEditVaccine(true)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpenModalDeleteVaccine = (vaccine: any) => {
    setVaccine(vaccine)
    setIsOpenDeleteVaccine(true)
  }

  const handleDeleteVaccine = useCallback(() => {
    vaccine?.id && deleteVaccine({ id: vaccine?.id })
    setIsOpenDeleteVaccine(false)
    setVaccine(undefined)
  }, [setIsOpenDeleteVaccine, setVaccine, vaccine, deleteVaccine])

  const handleCloseDeleteVaccineModal = () => {
    setVaccine(undefined)
    setIsOpenDeleteVaccine(false)
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
        handleEditVaccine={handleEditVaccine}
        getImagesWithUrlBucket={getImagesWithUrlBucket}
        handleOpenModalDeleteVaccine={handleOpenModalDeleteVaccine}
      />
      <EditVaccineModal
        vaccine={vaccine}
        isOpenEditVaccine={isOpenEditVaccine}
        setIsOpenEditVaccine={setIsOpenEditVaccine}
      />
      <DeleteVaccineModal
        vaccine={vaccine}
        isOpenDeleteVaccine={isOpenDeleteVaccine}
        handleDeleteVaccine={handleDeleteVaccine}
        handleCloseDeleteVaccineModal={handleCloseDeleteVaccineModal}
      />
    </>
  )
}
