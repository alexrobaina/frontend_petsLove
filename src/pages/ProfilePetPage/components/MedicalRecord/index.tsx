import { FC, ReactElement, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { IconMedicalReport } from '../../../../assets/icons'
import { BaseAccordeon } from '../../../../components/common/BaseAccordeon'
import { ReactModal } from '../../../../components/common/ReactModal'
import { formatDate } from '../../../../utils/formatDate'
import { IMedicalRecord } from '../../interfaces'

interface Props {
  medicalRecords: IMedicalRecord[]
  handleEdit: (id: string) => void
  handleDelete: (id: string) => void
}

export const MedicalRecord: FC<Props> = ({
  handleEdit,
  handleDelete,
  medicalRecords,
}) => {
  const { t } = useTranslation(['profilePet'])
  const [isOpenImage, setIsOpenImage] = useState<boolean>(false)
  const [selectImage, setSelectImage] = useState<string>('')
  const handleOpenImage = (image: string) => {
    setIsOpenImage(true)
    setSelectImage(image)
  }

  const handleCloseImage = () => {
    setIsOpenImage(false)
    setSelectImage('')
  }


const isIgnoredKey = (key: string): boolean =>
['title', 'createdAt', 'date', 'id'].includes(key)

const isNotEmptyAttachmentOrMedication = (
key: string,
value: string | [],
): boolean =>
!(key === 'attachments' || key === 'medications') || value.length > 0

const generateRecordChildren = (record: IMedicalRecord, handleOpenImage: (attachment: string ) => void): ReactElement => {
return (
  <div className="mt-2 flex gap-1 flex-col">
    {Object.entries(record).map(([key, value]) => {
      if (isIgnoredKey(key) || !isNotEmptyAttachmentOrMedication(key, value))
        return null

      if (value === '' || value === null) return null

      if (key === 'attachments') {
        return (
          <div
            key={key}
            className="w-full px-4 py-4 md:grid justify-between items-center rounded hover:bg-primary-100"
          >
            <h4 className="w-full text-base font-bold leading-6 text-primary-950">
              {t(`profilePet:${key}`)}
            </h4>
            <div className="flex gap-2">
              {value.map((attachment: string) => (
                <img
                  key={attachment}
                  onClick={() => handleOpenImage(`${import.meta.env.VITE_BUCKET_NAME}pets/${attachment}`)}
                  src={`${import.meta.env.VITE_BUCKET_NAME}pets/${attachment}`}
                  className="text-base w-[100px] cursor-pointer text-gray-600 h-[100px] mt-5 rounded-md object-cover"
                />
              ))}
            </div>
          </div>
        )
      }

      return (
        <div
          key={key}
          className="w-full px-4 py-4 md:grid justify-between items-center rounded hover:bg-primary-100"
        >
          <h4 className="w-full text-base  font-bold leading-6 text-primary-950">
            {t(`profilePet:${key}`)}
          </h4>
          <p className="text-base text-gray-600">{value}</p>
        </div>
      )
    })}
  </div>
)
}


  return (
  <>
    {medicalRecords &&
      medicalRecords.map((medicalRecord) => (
        <div key={medicalRecord.id}>
          <BaseAccordeon
            handleDelete={() => {
              handleDelete(medicalRecord.id || '')
            }}
            handleEdit={() => {
              handleEdit(medicalRecord.id || '')
            }}
            icon={<IconMedicalReport />}
            children={generateRecordChildren(medicalRecord, handleOpenImage)}
            title={`${medicalRecord.title} - ${t('profilePet:createdAt')} ${formatDate(
              medicalRecord.createdAt || '',
              'dd MMMM - yyyy',
            )}`}
          />
        </div>
      ))}
        <ReactModal buttonClose title="Medical attachment" closeModal={handleCloseImage} isOpen={isOpenImage}>
          <img
            src={selectImage}
            className="text-base wf-full cursor-pointer text-gray-600 h-full mt-5 rounded-md object-cover"
          />
        </ReactModal>
  </>
)}
