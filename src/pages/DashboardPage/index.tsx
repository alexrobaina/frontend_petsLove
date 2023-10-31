/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from 'formik'
import { FC, useCallback, useContext, useState } from 'react'

import { BaseLoading } from '../../components/BaseLoading'
import { SliderModal } from '../../components/SliderModal'
import { useCreatePet } from '../../hooks/useCreatePet'
import { useDashboardPets } from '../../hooks/useDashboardPets'
import { useDeletePet } from '../../hooks/useDeletePet'
import { AppContext } from '../../services/AppContext'

import { CreatePetForm } from './components/CreatePetForm'
import { DashboardHeader } from './components/DashboardHeader'
import { DashboardTable } from './components/DashboardTable/DashboardTable'
import { INITIAL_STATE, petSchema } from './constants'

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
  const { handleDeletePet, isLoading: deletePetLoading } = useDeletePet()
  const [urlImagesPreview, setUrlImagesPreview] = useState<string[]>([])

  const [isOpenModalCreation, setOpenModalCreation] = useState(false)

  const { data, isLoading } = useDashboardPets({
    page,
    gender,
    category,
    searchByName,
    adopted: isAdopted === 'adopted' ? true : false,
  })

  const closePetCreationSlider = () => {
    setOpenModalCreation(false)
  }

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    validationSchema: petSchema,
    onSubmit: async (values) => {
      values.weight = `${values.weight} ${values.units}`
      values.units = ''

      if (context.user?.role === 'SHELTER') values.shelterId = context?.user?.id

      mutate(values)

      formik.resetForm()
      closePetCreationSlider()
    },
  })

  const { values, handleChange, setFieldValue, errors, handleSubmit } = formik

  const resetFilters = () => {
    setIsAdopted('')
    setGender('')
    setCategory('')
    setSearchByName('')
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchByName(e.target.value)
  }

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setFieldValue('images', filesArray)

      const urls = filesArray.map((file) => URL.createObjectURL(file))
      setUrlImagesPreview(urls)
    }
  }

  const handleEdit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => {
    e.stopPropagation()
    console.log('edit', id)
  }

  const handleCreatePet = useCallback(async () => {
    setOpenModalCreation(true)
  }, [])

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    petId: string,
  ) => {
    e.stopPropagation()
    await handleDeletePet(petId)
  }

  if (isLoading || deletePetLoading)
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
        />
      </div>
      <SliderModal
        closeSlider={closePetCreationSlider}
        handleSubmit={handleSubmit}
        isOpen={isOpenModalCreation}
      >
        <CreatePetForm
          errors={errors}
          values={values}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          urlImagesPreview={urlImagesPreview}
          handleImagesChange={handleImagesChange}
        />
      </SliderModal>
    </>
  )
}
