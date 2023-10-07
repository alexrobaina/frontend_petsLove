import { FC, useState } from 'react'

import { BaseButton } from '../../components/BaseButton'
import { BaseLoading } from '../../components/BaseLoading'
import { useDashboardPets } from '../../hooks/useDashboardPets'
import { useDeletePet } from '../../hooks/useDeletePet'
import { useModal } from '../../hooks/useModal'
import { useSlider } from '../../hooks/useSlider'

import { DashboardHeader } from './components/DashboardHeader'
import { DashboardTable } from './components/DashboardTable/DashboardTable'

export const DashboardPage: FC = () => {
  const [page, setPage] = useState(1)
  const [isAdopted, setIsAdopted] = useState('inAdoption')
  const [gender, setGender] = useState('')
  const [category, setCategory] = useState('')
  const [searchByName, setSearchByName] = useState('')
  const { handleDeletePet, isLoading: deletePetLoading } = useDeletePet()

  const { data, isLoading } = useDashboardPets({
    page,
    gender,
    category,
    searchByName,
    adopted: isAdopted === 'adopted' ? true : false,
  })

  const resetFilters = () => {
    setIsAdopted('')
    setGender('')
    setCategory('')
    setSearchByName('')
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchByName(e.target.value)
  }

  const { openModal, Modal } = useModal()
  const { openSlider, Slider } = useSlider()

  const handleEdit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => {
    e.stopPropagation()
    console.log('edit', id)

    openSlider({
      styles: '',
      title: 'Edit Pet',
      onSubmit: () => alert(1),
      children: <div>Slider Content</div>,
    })
  }

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    petId: string,
    userRole: string,
  ) => {
    e.stopPropagation()

    openModal({
      type: 'delete',
      title: 'Delete Pet',
      onSubmit: () => handleDeletePet(petId, userRole),
      description: 'Are you sure you want to delete this pet?',
    })
  }

  const handleCreatePet = async () => {
    openSlider({
      styles: '',
      title: 'Modal Slider',
      onSubmit: () => alert(1),
      children: <div>Slider Content</div>,
    })
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
      {data?.pets?.length === 0 && (
        <div className="h-screen w-full -mt-20 flex flex-col gap-5 justify-center items-center">
          <h1 className="text-3xl font-semibold">Pets not Found</h1>
          <h1>
            You don&apos;t have any pets yet. Click the button below to create
            your first pet.
          </h1>
          <BaseButton
            size="small"
            type="button"
            text="Create Pet"
            onClick={handleCreatePet}
          />
        </div>
      )}
      {data?.pets?.length !== 0 && (
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
      )}
      <Modal />
      <Slider />
    </>
  )
}
