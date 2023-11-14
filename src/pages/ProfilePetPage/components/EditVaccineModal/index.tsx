import { useFormik } from 'formik'
import { FC, useEffect, useState } from 'react'

import { BaseButton } from '../../../../components/common/BaseButton'
import { BaseSelect } from '../../../../components/common/BaseSelect'
import { ReactModal } from '../../../../components/common/ReactModal'
import { useUpdatePetVaccine } from '../../../../hooks/useUpdatePetVaccine'
import { petVaccineSchema } from '../../validations'

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

interface Props {
  vaccine?: IVaccine
  isOpenEditVaccine: boolean
  setIsOpenEditVaccine: (value: boolean) => void
}

export const EditVaccineModal: FC<Props> = ({
  vaccine,
  isOpenEditVaccine,
  setIsOpenEditVaccine,
}) => {
  const { mutate: updatePetVaccine } = useUpdatePetVaccine()
  const [files, setFiles] = useState<YourImageType[]>([])

  const formik = useFormik({
    validationSchema: petVaccineSchema,
    initialValues: {
      files: [],
      status: '',
      oldFiles: vaccine?.files || [],
    },
    onSubmit: async (values) => {
      updatePetVaccine({
        ...values,
        id: vaccine?.id,
      })
      setFiles([])
      formik.resetForm()
    },
  })

  const { values, errors, resetForm, handleSubmit, setFieldValue } = formik

  const handleNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = Array.from(e.target.files).map((file) => ({
        file: file,
        isNew: true, // Mark the image as new
        isDeleted: false,
        url: URL.createObjectURL(file), // Create a URL for preview
      }))

      setFiles((currentImages) => [...currentImages, ...image])
      setFieldValue('files', files)
    }
  }

  const handleCancelEditVaccine = () => {
    {
      setFiles([])
      setIsOpenEditVaccine(false)
      resetForm({})
    }
  }

  const handleImageDeletion = (imageToDelete: YourImageType) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFiles((currentImages: any) =>
      currentImages
        .map((file: YourImageType) => {
          if (file === imageToDelete) {
            if (file.isNew) {
              URL.revokeObjectURL(file.url) // Revoke the object URL to prevent memory leaks
              return null // Remove the image from the array
            }
            return { ...file, isDeleted: true }
          }
          return file // Keep all images that aren't being deleted
        })
        .filter((file: never) => file !== null),
    ) // Remove the null values from the array
  }

  useEffect(() => {
    setFiles([])
    if (vaccine?.files) {
      const file = vaccine?.files?.map((file) => ({
        file: file as unknown as File,
        isNew: false,
        isDeleted: false,
        url: `${file}`,
      }))

      setFiles((currentImages) => [...currentImages, ...file])
      setFieldValue('files', files)
    }
  }, [vaccine, isOpenEditVaccine, setFieldValue])

  useEffect(() => {
    setFieldValue('status', vaccine?.status)
  }, [vaccine, setFieldValue])

  return (
    <ReactModal
      buttonClose
      isOpen={isOpenEditVaccine}
      title={vaccine?.Vaccine?.name}
      closeModal={handleCancelEditVaccine}
      description={vaccine?.Vaccine.description}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 mt-2 flex-col"></div>
        <div className="flex justify-end w-full flex-col gap-5 mt-5">
          <BaseSelect
            name="status"
            label="Vaccine status"
            value={values?.status}
            error={errors?.status}
            setFieldValue={setFieldValue}
            placeholder="Select the vaccine status"
            options={[
              { value: 'PENDING', label: 'Pending' },
              { value: 'DONE', label: 'Done' },
              { value: 'NOT_APPLICABLE', label: 'Not Applicable' },
            ]}
          />
          <div className="flex justify-end flex-col mt-4">
            <div className="flex gap-2 mb-3">
              {files &&
                files.map(
                  (file: YourImageType) =>
                    !file.isNew &&
                    !file.isDeleted && (
                      <img
                        key={file.url}
                        alt="Pet vaccine file"
                        onClick={() => handleImageDeletion(file)}
                        src={`${import.meta.env.VITE_BUCKET_NAME}${file.url}`}
                        className="h-12 w-12 flex-none rounded-lg bg-gray-800 object-cover :hover:opacity-50 cursor-pointer"
                      />
                    ),
                )}
              {files.map(
                (file: YourImageType) =>
                  file.isNew && (
                    <img
                      src={file.url}
                      alt="vaccine file"
                      onClick={() => handleImageDeletion(file)}
                      className="h-12 w-12 flex-none rounded-lg bg-gray-800 object-cover :hover:opacity-50 cursor-pointer"
                    />
                  ),
              )}
            </div>
            <label
              htmlFor="file"
              className="sm:w-auto w-full rounded text-center cursor-pointer px-2 py-4 text-sm font-semibold text-primary-950 shadow-sm ring-1 ring-inset ring-primary-300 hover:bg-primary-300"
            >
              Select a file
            </label>
            <input
              type="file"
              id="file"
              name="files"
              className="hidden"
              onChange={handleNewImage}
            />
            <p className="mt-2 text-xs leading-5 text-gray-400">
              JPG or PNG. 1.5MB max.
            </p>
          </div>
        </div>
        <div className="flex gap-5 justify-end ">
          <BaseButton
            text="Cancel"
            style="secondary"
            onClick={handleCancelEditVaccine}
          />
          <BaseButton
            text="Save"
            onClick={() => {
              setIsOpenEditVaccine(false)
              handleSubmit()
            }}
          />
        </div>
      </form>
    </ReactModal>
  )
}
