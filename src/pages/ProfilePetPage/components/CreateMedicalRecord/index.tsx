import { useFormik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { BaseInput } from '../../../../components/common/BaseInput'
import { BaseSelect } from '../../../../components/common/BaseSelect'
import { BaseTextArea } from '../../../../components/common/BaseTextArea'
import { SliderModal } from '../../../../components/common/SliderModal'
import { useCreateMedicalRecord } from '../../../../hooks/medicalRecords/useCreateMedicalRecord'
import { useMedicalRecordUpdate } from '../../../../hooks/medicalRecords/useMedicalRecordUpdate'
import useUserList from '../../../../hooks/user/useUserList'
import { FileType } from '../../../DashboardPage/constants'

import { medicalRecordValidation } from './constants'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  medicalRecord?: any
  isOpenModalCreation: boolean
  toggleCreateMedicalRecord: () => void
}

export const CreateMedicalRecord: FC<Props> = ({
  medicalRecord,
  isOpenModalCreation,
  toggleCreateMedicalRecord,
}) => {
  const { id = '' } = useParams<{ id: string }>()
  const { data: userListVet } = useUserList({ role: 'VET' })
  const { mutate: createMedicalRecord } = useCreateMedicalRecord()
  const { mutate: uptadateMedicalRecord } = useMedicalRecordUpdate()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [attachments, setAttachments]: any = useState<FileType[]>([])

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      diagnosis: '',
      treatment: '',
      vetId: null,
      clinicName: '',
      notes: '',
      petId: '',
      attachments: [],
    },
    validationSchema: medicalRecordValidation,
    validateOnChange: false,
    onSubmit: async (values) => {
      values.attachments = attachments
      values.petId = id

      if (medicalRecord?.id) {
        uptadateMedicalRecord({ ...values, id: medicalRecord.id })
      } else {
        createMedicalRecord(values)
      }
      setAttachments([])
      formik.resetForm()
      toggleCreateMedicalRecord()
    },
  })

  useEffect(() => {
    if (medicalRecord) {
      setAttachments(() =>
        medicalRecord.attachments.map((attachment: FileType) => {
          return { url: attachment, isDeleted: false, isNew: false }
        }),
      )
      formik.setValues({ ...medicalRecord, attachments })
    }
  }, [medicalRecord])

  const { values, errors, handleChange, setFieldValue, handleSubmit } = formik

  useEffect(() => {
    if (!isOpenModalCreation) {
      setAttachments([])
      formik.resetForm()
    }
  }, [isOpenModalCreation])

  const handleCloseSlider = () => {
    toggleCreateMedicalRecord()
  }

  const handleNewAttachments = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newAttachments = Array.from(e.target.files).map((file) => ({
        file: file,
        isNew: true, // Mark the image as new
        url: URL.createObjectURL(file), // Create a URL for preview
      }))

      setAttachments((currentAttachments: FileType[]) => [
        ...currentAttachments,
        ...newAttachments,
      ])
    }
  }

  const handleAttachmentsDeletion = (attachmentToDelete: FileType) => {
    setAttachments((currentAttachments: FileType[]) =>
      currentAttachments
        .map((attachment: FileType) => {
          if (attachment === attachmentToDelete) {
            if (attachment.isNew) {
              URL.revokeObjectURL(attachment.url) // Revoke the object URL to prappointment memory leaks
              return null // Remove the attachemnt from the array
            }
            return { ...attachment, isDeleted: true }
          }
          return attachment // Keep all attachments that aren't being deleted
        })
        .filter((attachment) => attachment !== null),
    ) // Remove the null values from the array
  }

  useEffect(() => {
    if (id) setFieldValue('petId', id)
  }, [id, setFieldValue])

  return (
    <SliderModal
      handleSubmit={handleSubmit}
      isOpen={isOpenModalCreation}
      closeSlider={handleCloseSlider}
    >
      <form>
        <h1 className="text-2xl font-medium col-span-full">
          Create Medical Record
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-1  gap-8 w-full mt-5">
          <div className="col-span-1/2 flex flex-col gap-3">
            <div className="flex gap-2 md:gap-2 overflow-x-auto w-full">
              {attachments &&
                attachments.map(
                  (attachments: FileType) =>
                    !attachments.isNew &&
                    !attachments.isDeleted && (
                      <img
                        key={attachments.url}
                        alt="pet attachments"
                        onClick={() => handleAttachmentsDeletion(attachments)}
                        src={`${import.meta.env.VITE_BUCKET_NAME}${
                          attachments.url
                        }`}
                        className="h-12 w-12 flex-none rounded-lg bg-gray-800 object-cover :hover:opacity-50 cursor-pointer"
                      />
                    ),
                )}
              {attachments &&
                attachments.map(
                  (attachments: FileType) =>
                    attachments.isNew && (
                      <img
                        src={attachments.url}
                        alt="user attachments"
                        onClick={() => handleAttachmentsDeletion(attachments)}
                        className="h-12 w-12 flex-none rounded-lg bg-gray-800 object-cover :hover:opacity-50 cursor-pointer"
                      />
                    ),
                )}
            </div>
            <div>
              <div className="flex w-full">
                <label
                  htmlFor="file"
                  className="w-full rounded px-2 py-1 text-sm font-semibold text-primary-950 shadow-sm ring-1 ring-inset ring-primary-300 hover:bg-primary-300"
                >
                  Select a file
                </label>
                <input
                  multiple
                  id="file"
                  type="file"
                  name="images"
                  className="hidden"
                  onChange={handleNewAttachments}
                />
              </div>
              <p className="mt-2 text-xs leading-5 text-gray-400">
                JPG, GIF or PNG. 1.5MB max.
              </p>
            </div>
          </div>
        </div>
        <div className="grid mt-4 md:mt-10 grid-cols-1 sm:grid-cols-2 w-full gap-4">
          <div className="sm:col-span-1 w-full">
            <BaseInput
              name="title"
              label="Title"
              error={errors?.title}
              value={values?.title}
              placeholder="Name of pet"
              handleChange={handleChange}
            />
          </div>
          <div className="sm:col-span-1 w-full">
            <BaseInput
              name="clinicName"
              label="Clinic name"
              error={errors?.clinicName}
              value={values?.clinicName}
              handleChange={handleChange}
              placeholder="Add the Clinic name"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:gap-8 w-full mt-5">
          <div className="col-span-1 w-full">
            <BaseSelect
              label="Vet"
              name="vetId"
              error={errors.vetId}
              value={values?.vetId || ''}
              setFieldValue={setFieldValue}
              options={userListVet?.users.map(
                (user: { email: string; id: string }) => ({
                  value: user.id,
                  label: `${user.email} `,
                }),
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:gap-8 w-full mt-5">
          <div className="col-span-1">
            <BaseTextArea
              height={100}
              name="description"
              label="Description"
              error={errors.description}
              value={values?.description}
              handleChange={handleChange}
              placeholder="Add a description"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 md:gap-8 w-full mt-5">
          <div className="sm:col-span-1 w-full">
            <BaseInput
              name="diagnosis"
              label="Diagnosis"
              error={errors?.diagnosis}
              value={values?.diagnosis}
              placeholder="Add diagnosis"
              handleChange={handleChange}
            />
          </div>
          <div className="sm:col-span-1/2 w-full">
            <BaseInput
              name="treatment"
              label="Treatment"
              error={errors?.treatment}
              value={values?.treatment}
              handleChange={handleChange}
              placeholder="Add a treatment"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:gap-8 w-full mt-5">
          <div className="col-span-1">
            <BaseTextArea
              height={80}
              name="notes"
              label="Notes"
              placeholder="Add notes"
              error={errors.notes}
              value={values?.notes}
              handleChange={handleChange}
            />
          </div>
        </div>
      </form>
    </SliderModal>
  )
}
