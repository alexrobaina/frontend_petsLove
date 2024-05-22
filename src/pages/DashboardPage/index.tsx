/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from 'formik'
import { FC, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BaseLoading } from '../../components/common/BaseLoading'
import { DeleteModal } from '../../components/common/DeleteModal'
import { SliderModal } from '../../components/common/SliderModal'
import { useCreatePet } from '../../hooks/pets/useCreatePet'
import { useDeletePet } from '../../hooks/pets/useDeletePet'
import { useGetPet } from '../../hooks/pets/useGetPet'
import { usePetUpdate } from '../../hooks/pets/usePetUpdate'
import { usePetAnalytics } from '../../hooks/usePetAnalytics/usePetAnalytics'
import { useUserPets } from '../../hooks/user/useUserPets'
import { AppContext } from '../../services/AppContext'
import { AppointmentForm } from '../AppointmentsPage/components/AppointmentForm'
import { useAppointmentForm } from '../AppointmentsPage/hooks/useAppointmentForm'
import { PetDetail } from '../ProfilePetPage/interfaces'

import { CreatePetForm } from './components/CreatePetForm'
import { DashboardHeader } from './components/DashboardHeader'
import { DashboardTable } from './components/DashboardTable/DashboardTable'
import { INITIAL_STATE, FileType, petSchema } from './constants'

export const DashboardPage: FC = () => {
  const [isOpenappointment, setOpenappointment] = useState(false)
  const context:
  | {
    user: {
      role: string
      id: string
    }
  }
  | any = useContext(AppContext)
  const { data: petAnalytics } = usePetAnalytics(context?.user?.id);
  const { t } = useTranslation(['common'])
  const [page, setPage] = useState(1)
  const [isAdopted, setIsAdopted] = useState('')
  const [gender, setGender] = useState('')
  const [category, setCategory] = useState('')
  const [searchByName, setSearchByName] = useState('')
  const { mutate, isLoading: isLoadingCreate } = useCreatePet()
  const { mutatePetUpdate, isLoading: updatePetLoading } = usePetUpdate()
  const [petId, setPetId] = useState('')
  const { handleDeletePet, isLoading: deletePetLoading } = useDeletePet()
  const [titleForm, setTitleForm] = useState('Create pet')
  const [images, setImages] = useState<any[]>([])
  const [petDelete, setPetDelete] = useState({
    petId: '',
    petName: '',
  })
  const [deleteModalPet, setDeleteModalPet] = useState(false)
  const [isOpenModalCreation, setOpenModalCreation] = useState(false)
  const { data: petData, isLoading: isLoadingGetPet } = useGetPet(petId)

  const getIsAdopted = () => {
    if (isAdopted === 'adopted') return true
    if (isAdopted === 'inAdoption') return false
    return ''
  }

  const { formik: appointmentFormik } = useAppointmentForm(() =>
    setOpenappointment(false),
  )

  const { data, isLoading } = useUserPets({
    id: context.user?.id,
    page,
    gender,
    category,
    searchByName,
    adopted: getIsAdopted(),
  })

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    validationSchema: petSchema,
    onSubmit: async (values) => {
      values.weight = `${values.weight} ${values.units}`
      values.units = ''

      if (context?.user?.locationId) values.locationId = context.user.locationId

      if (petId) {
        mutatePetUpdate({ ...values, id: petId })
      } else {
        if (context?.user?.role === 'SHELTER')
          values.shelterId = context?.user?.id
        mutate(values)
      }

      setImages([])
      formik.resetForm()
      closePetCreationSlider()
    },
  })

  const {
    values,
    errors,
    touched,
    resetForm,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = formik

  const closePetCreationSlider = () => {
    setOpenModalCreation(false)
    setPetId('')
    setImages([])
    resetForm({ values: INITIAL_STATE })
  }

  const resetFilters = () => {
    setIsAdopted('')
    setGender('')
    setCategory('')
    setSearchByName('')
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchByName(e.target.value.toLowerCase())
  }

  const handleNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) => ({
        file: file,
        isNew: true, // Mark the image as new
        url: URL.createObjectURL(file), // Create a URL for preview
      }))
      setFieldValue('newImages', newImages)
      setImages((currentImages) => [...currentImages, ...newImages])
    }
  }

  const handleEdit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => {
    setOpenModalCreation(true)
    e.stopPropagation()
    setTitleForm(t('common:editPet'))
    setPetId(id)
  }

  const handleOpenappointment = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => {
    setOpenappointment(true)
    e.stopPropagation()
    setTitleForm(t('common:appointment'))
    appointmentFormik.setFieldValue('petId', id)
    setPetId(id)
  }

  const handleCloseAppintmentForm = () => {
    setOpenappointment(false)
    appointmentFormik.resetForm()
    appointmentFormik.setFieldValue('recipientId', '')
    appointmentFormik.setFieldValue('petId', '')
    setPetId('')
  }

  const handleCreatePet = () => {
    setTitleForm(t('common:createPet'))
    setPetId('')
    resetForm({ values: INITIAL_STATE })
    setOpenModalCreation(true)
  }

  const handleDelete = ({
    e,
    petId,
    petName,
  }: {
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    petId: string
    petName: string
  }) => {
    setPetDelete({ petId, petName })
    setDeleteModalPet(true)
    e.stopPropagation()
  }

  const handleImageDeletion = (imageToDelete: FileType) => {
    // Update the images state to filter out the image that needs to be deleted
    setImages((currentImages) =>
      currentImages
        .map((image) => {
          if (image === imageToDelete) {
            if (image.isNew) {
              URL.revokeObjectURL(image.url) // Revoke the object URL to prappointment memory leaks
              return null // Remove the image from the array
            }
            return { ...image, isDeleted: true }
          }
          return image // Keep all images that aren't being deleted
        })
        .filter((image) => image !== null),
    ) // Remove the null values from the array
  }

  useEffect(() => {
    if (petData?.pet) {
      const petToEdit = {
        units: petData?.pet?.weight.split(' ')[1] || '',
        weight: petData?.pet?.weight.split(' ')[0] || '',
        name: petData?.pet?.name || '',
        category: petData?.pet?.category || '',
        gender: petData?.pet?.gender || '',
        age: petData?.pet?.age || '',
        size: petData?.pet?.size || '',
        locationId: petData?.pet?.locationId || '',
        breed: petData?.pet?.breed || '',
        images: images,
        description: petData?.pet?.description || '',
        shelterId: petData?.pet?.shelterId || null,
        adoptedBy: petData?.pet?.adoptedBy || null,
        newImages: [],
        vetId: petData?.pet?.vetId || null,
      }

      resetForm({ values: petToEdit })
    }
  }, [petData, resetForm, images])

  useEffect(() => {
    // This will clean up the object URLs when the component is unmounted
    return () => {
      images.forEach((image) => {
        if (image.isNew) {
          URL.revokeObjectURL(image.url)
        }
      })
    }
  }, [images])

  useEffect(() => {
    if (petData?.pet) {
      const existingImages = petData.pet.images.map((image: string) => ({
        url: image,
        isNew: false,
        isDeleted: false,
      }))

      setImages(existingImages)
    }
  }, [petData, setFieldValue])

  if (isLoading || deletePetLoading || isLoadingGetPet || isLoadingCreate)
    <div className="mt-20 h-[50%}">
      <BaseLoading large />
    </div>

  return (
    <>
      <DashboardHeader
        gender={gender}
        category={category}
        setGender={setGender}
        isAdopted={isAdopted}
        setCategory={setCategory}
        setIsAdopted={setIsAdopted}
        resetFilters={resetFilters}
        petAnalytics={petAnalytics}
      />
      <div className="px-4 sm:px-6 lg:px-8 shadow-md rounded-lg mt-16">
        <DashboardTable
          page={page}
          data={data}
          setPage={setPage}
          handleEdit={handleEdit}
          searchByName={searchByName}
          handleSearch={handleSearch}
          handleDelete={handleDelete}
          handleCreatePet={handleCreatePet}
          updatePetLoading={updatePetLoading}
          setOpenAttachment={handleOpenappointment}
        />
      </div>
      <SliderModal
        handleSubmit={handleSubmit}
        isOpen={isOpenModalCreation}
        closeSlider={closePetCreationSlider}
      >
        <CreatePetForm
          errors={errors}
          values={values}
          images={images}
          isEdit={!!petId}
          title={titleForm}
          touched={touched}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          handleNewImage={handleNewImage}
          handleImageDeletion={handleImageDeletion}
        />
      </SliderModal>
      <DeleteModal
        isOpen={deleteModalPet}
        handleClose={() => setDeleteModalPet(false)}
        handleDelete={() => {
          handleDeletePet(petDelete.petId)
          setDeleteModalPet(false)
        }}
        title={`${t('common:areYouSureDelete')} ${petDelete.petName}?`}
      />
      <SliderModal
        title={titleForm}
        isOpen={isOpenappointment}
        handleSubmit={appointmentFormik.handleSubmit}
        closeSlider={handleCloseAppintmentForm}
      >
        <AppointmentForm
          pets={data?.pets}
          values={appointmentFormik.values}
          errors={appointmentFormik.errors}
          userId={context.user?.id}
          handleChange={appointmentFormik.handleChange}
          setFieldValue={appointmentFormik.setFieldValue}
          closeModal={handleCloseAppintmentForm}
          pet={data?.pets?.find((pet: PetDetail) => pet.id === petId)}
        />
      </SliderModal>
    </>
  )
}
