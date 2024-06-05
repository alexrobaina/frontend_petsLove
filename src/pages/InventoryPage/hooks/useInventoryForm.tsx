import { useFormik } from 'formik'
import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { useCreateInventory } from '../../../hooks/inventory/useCreateInventory'
import { useUpdateInventory } from '../../../hooks/inventory/useUpdateInventory'
import { FileType } from '../../ProfilePetPage'
import { ICreateInventoryForm } from '../constants'

export const useInventoryForm = (
  initialValues: ICreateInventoryForm,
  closeModal: () => void,
) => {
  const { t } = useTranslation(['common', 'inventory'])
  const { mutate: createInventory, isLoading } = useCreateInventory()
  const { mutate: updateInventory } = useUpdateInventory()
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required(t('common.isRequired')),
      type: Yup.string().required(t('common.isRequired')),
      description: Yup.string(),
      quantity: Yup.number().required(t('common.isRequired')),
      price: Yup.number().required(t('common.isRequired')),
      images: Yup.array().of(Yup.mixed()),
      newImages: Yup.array().of(Yup.mixed()),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (values.id) {
          await updateInventory(values)
        } else {
          await createInventory(values)
        }
        setSubmitting(false)
        resetForm({
          values: initialValues,
        })
        toast.success('Inventory created successfully')
        closeModal()
      } catch (error) {
        setSubmitting(false)
        toast.error('Failed to create inventory item')
      }
    },
  })

  const handleNewImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
        isNew: true,
        isDeleted: false,
      }))
      formik.setFieldValue('newImages', [
        ...(formik.values.newImages ?? []),
        ...newImages,
      ])
    }
  }

  const handleImageDeletion = (imageToDelete: FileType) => {
    if (imageToDelete.isNew) {
      URL.revokeObjectURL(imageToDelete.url) // Revoke the object URL to prevent memory leaks
      formik.setFieldValue(
        'newImages',
        formik.values.newImages.filter((image) => image !== imageToDelete),
      )
    } else {
      formik.setFieldValue(
        'images',
        formik.values.images.map((image) =>
          image === imageToDelete ? { ...image, isDeleted: true } : image,
        ),
      )
    }
  }

  return {
    formik,
    isLoading,
    handleNewImage,
    handleImageDeletion,
  }
}
