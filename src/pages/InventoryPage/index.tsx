import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BaseLoading, SliderModal } from '../../components'
import { DeleteModal } from '../../components/common/DeleteModal'
import { useDeleteInventory } from '../../hooks/inventory/useDeleteInventory'
import { useGetInventory } from '../../hooks/inventory/useGetInventory'
import { useGetInventoryList } from '../../hooks/inventory/useInventoryList'

import { CreateInventoryForm } from './components/CreateInventoryForm'
import { InventoryTable } from './components/InventaryTable'
import { InventoryHeader } from './components/InventoryHeader'
import { ICreateInventoryForm } from './constants'
import { useInventoryForm } from './hooks/useInventoryForm'

const initialValues: ICreateInventoryForm = {
  name: '',
  type: '',
  images: [],
  price: null,
  newImages: [],
  quantity: null,
  description: '',
}

export const InventoryPage: FC = () => {
  const [isOpenModalCreation, setIsOpenModalCreation] = useState(false)
  const [page, setPage] = useState(1)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [inventoryId, setInventoryId] = useState('')
  const { t } = useTranslation(['inventory', 'common'])
  const { mutate: deleteInventory } = useDeleteInventory()
  const { data: inventory, isLoading: isLoadingGetInventory } =
    useGetInventory(inventoryId)
  const {
    name,
    setName,
    quantity,
    setQuantity,
    inventoryType,
    setInventoryType,
    data: inventoryList,
  } = useGetInventoryList()
  const {
    formik,
    handleNewImage,
    handleImageDeletion,
    isLoading: isLoadingCreateInventory,
  } = useInventoryForm(initialValues, () => setIsOpenModalCreation(false))

  const { values, errors, touched, handleChange, setFieldValue, handleSubmit } =
    formik

  const handleCreateInventory = () => {
    setIsOpenModalCreation(true)
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault()
    e.stopPropagation()

    setInventoryId(id)

    setIsOpenDeleteModal(true)
  }

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault()
    e.stopPropagation()

    setInventoryId(id)

    setIsOpenModalCreation(true)
  }

  const closeCreationSlider = () => {
    setIsOpenModalCreation(false)
    setInventoryId('')
    formik.resetForm({
      values: initialValues,
    })
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const submit = () => {
    handleSubmit()
  }

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value)
  }

  const handleInventoryTypeChange = (_type: string, value: string) => {
    setInventoryType(value)
  }

  useEffect(() => {
    if (inventory) {
      setFieldValue('id', inventory.id)
      setFieldValue('name', inventory.name)
      setFieldValue('type', inventory.type)
      setFieldValue('price', inventory.price)
      setFieldValue('quantity', inventory.quantity)
      setFieldValue('description', inventory.description)

      const existingImages = inventory.images.map((image: string) => ({
        url: image,
        isNew: false,
        isDeleted: false,
      }))

      setFieldValue('images', existingImages)
    }
  }, [inventory, setFieldValue])

  if (isLoadingGetInventory || isLoadingCreateInventory) {
    return (
      <div className="mt-20 h-[50%}">
        <BaseLoading large />
      </div>
    )
  }

  return (
    <>
      <InventoryHeader />
      <InventoryTable
        name={name}
        page={page}
        setPage={setPage}
        quantity={quantity}
        data={inventoryList}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        inventoryType={inventoryType}
        handleNameChange={handleNameChange}
        handleQuantityChange={handleQuantityChange}
        handleCreateInventory={handleCreateInventory}
        handleInventoryTypeChange={handleInventoryTypeChange}
        updateInventoryLoading={false} // Add the missing property
      />
      <SliderModal
        handleSubmit={submit}
        isOpen={isOpenModalCreation}
        closeSlider={closeCreationSlider}
      >
        <CreateInventoryForm
          errors={errors}
          values={values}
          touched={touched}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          handleNewImage={handleNewImage}
          handleImageDeletion={handleImageDeletion}
          title={
            values.id
              ? t('inventory:editInventory')
              : t('inventory:addInventory')
          }
        />
      </SliderModal>
      <DeleteModal
        isOpen={isOpenDeleteModal}
        handleClose={() => setIsOpenDeleteModal(false)}
        handleDelete={() => {
          deleteInventory(inventoryId)
          setIsOpenDeleteModal(false)
        }}
        title={`${t('common:areYouSureDeleteProduct')}?`}
      />
    </>
  )
}
