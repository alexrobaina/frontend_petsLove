import { FC, useCallback, useContext, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Params, useNavigate, useParams } from 'react-router-dom'

import { BaseLoading } from '../../components/common/BaseLoading'
import { DeleteModal } from '../../components/common/DeleteModal'
import { Header } from '../../components/common/Header'
import { useGetPet } from '../../hooks/pets/useGetPet'
import { useCheckUserMembership } from '../../hooks/teams/useUserPartOfPetCreatorTeam'
import { useDelecteVaccine } from '../../hooks/vaccine/useDelecteVaccine'
import { AppContext } from '../../services/AppContext'

import { EditVaccineModal } from './components/EditVaccineModal'
import { PetView } from './components/PetView'

export type FileType = {
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
  const context = useContext(AppContext)
  const { t } = useTranslation('common')
  const { id }: Params<string> = useParams()
  const { mutate: deleteVaccine } = useDelecteVaccine()
  const { data: isMember, isLoading: isLoadingMembership } =
    useCheckUserMembership(id, context?.user?.id)

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
    return `${import.meta.env.VITE_BUCKET_NAME}pets/${image}`
  })

  const checkIfUserIsOwner = useCallback(() => {
    if (!context) return false
    const userId = context.user?.id

    return (
      data.pet.createdBy === userId ||
      data.pet.shelterId === userId ||
      data.pet.adoptedBy === userId ||
      data.pet.vetId === userId ||
      isMember
    )
  }, [context, data, isMember])

  if (isLoading || isLoadingMembership) return <BaseLoading large />

  return (
    <>
      <Helmet>
        <title>{data?.pet?.name} - Pet Profile</title>
        <meta name="description" content={data?.pet?.description} />
        {data?.pet?.images?.length > 0 && (
          <meta
            property="og:image"
            content={`${import.meta.env.VITE_BUCKET_NAME}pets/${data.pet.images[0]}`}
          />
        )}
        <meta property="og:title" content={data?.pet?.name} />
        <meta property="og:description" content={data?.pet?.description} />
      </Helmet>
      <div className="flex justify-between">
        <div className="flex gap-5">
          <Header title={data?.pet?.name} buttonBack />
        </div>
      </div>
      <PetView
        pet={data?.pet}
        gotToUser={gotToUser}
        handleEditVaccine={handleEditVaccine}
        checkIfUserIsOwner={checkIfUserIsOwner}
        getImagesWithUrlBucket={getImagesWithUrlBucket}
        handleOpenModalDeleteVaccine={handleOpenModalDeleteVaccine}
      />
      <EditVaccineModal
        vaccine={vaccine}
        isOpenEditVaccine={isOpenEditVaccine}
        setIsOpenEditVaccine={setIsOpenEditVaccine}
      />
      <DeleteModal
        isOpen={isOpenDeleteVaccine}
        handleDelete={handleDeleteVaccine}
        handleClose={handleCloseDeleteVaccineModal}
        title={`${t('common:areYouSureDelete')} ${vaccine?.Vaccine?.name}?`}
      />
    </>
  )
}
