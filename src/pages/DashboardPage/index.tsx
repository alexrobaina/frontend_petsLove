/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from 'formik'
import { FC, useContext, useEffect, useState } from 'react'

import { BaseLoading } from '../../components/common/BaseLoading'
import { SliderModal } from '../../components/common/SliderModal'
import { useCreatePet } from '../../hooks/useCreatePet'
import { useDashboardPets } from '../../hooks/useDashboardPets'
import { useDeletePet } from '../../hooks/useDeletePet'
import { useGetPet } from '../../hooks/useGetPet'
import { usePetUpdate } from '../../hooks/usePetUpdate'
import { AppContext } from '../../services/AppContext'

import { CreatePetForm } from './components/CreatePetForm'
import { DashboardHeader } from './components/DashboardHeader'
import { DashboardTable } from './components/DashboardTable/DashboardTable'
import { INITIAL_STATE, YourImageType, petSchema } from './constants'

export const DashboardPage: FC = () => {
  const context:
    | {
        user: {
          role: string
          id: string
        }
      }
    | any = useContext(AppContext)
  const [page, setPage] = useState(1)
  const [isAdopted, setIsAdopted] = useState('inAdoption')
  const [gender, setGender] = useState('')
  const [category, setCategory] = useState('')
  const [searchByName, setSearchByName] = useState('')
  const { mutate } = useCreatePet()
  const { mutatePetUpdate, isLoading: updatePetLoading } = usePetUpdate()
  const [petId, setPetId] = useState('')
  const { handleDeletePet, isLoading: deletePetLoading } = useDeletePet()
  const [titleForm, setTitleForm] = useState('Crear mascota')
  const [images, setImages] = useState<any[]>([])

  const [isOpenModalCreation, setOpenModalCreation] = useState(false)

  const { data: petData, isLoading: isLoadingGetPet } = useGetPet(petId)
  const { data, isLoading } = useDashboardPets({
    page,
    gender,
    category,
    searchByName,
    adopted: isAdopted === 'adopted' ? true : false,
  })

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    validationSchema: petSchema,
    onSubmit: async (values) => {
      values.weight = `${values.weight} ${values.units}`
      values.units = ''

      if (context.user?.role === 'SHELTER') values.shelterId = context?.user?.id

      if (petId) {
        mutatePetUpdate({ ...values, id: petId })
      } else {
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
    setSearchByName(e.target.value)
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
    setTitleForm('Edit pet')
    setPetId(id)
  }

  const handleCreatePet = () => {
    setTitleForm('Create pet')
    setPetId('')
    resetForm({ values: INITIAL_STATE })
    setOpenModalCreation(true)
  }

  const handleDelete = async ({
    e,
    petId,
    role,
  }: {
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    petId: string
    role?: string
  }) => {
    console.log(role)

    e.stopPropagation()
    await handleDeletePet(petId)
  }

  const handleImageDeletion = (imageToDelete: YourImageType) => {
    // Update the images state to filter out the image that needs to be deleted
    setImages((currentImages) =>
      currentImages
        .map((image) => {
          if (image === imageToDelete) {
            if (image.isNew) {
              URL.revokeObjectURL(image.url) // Revoke the object URL to prevent memory leaks
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
        breed: petData?.pet?.breed || '',
        images: images,
        description: petData?.pet?.description || '',
        shelterId: petData?.pet?.shelterId || '',
        adoptedBy: petData?.pet?.adoptedBy || '',
        newImages: [],
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

  if (isLoading || deletePetLoading || isLoadingGetPet)
    <div className="mt-20">
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
          title={titleForm}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          handleNewImage={handleNewImage}
          handleImageDeletion={handleImageDeletion}
        />
      </SliderModal>
    </>
  )
}
