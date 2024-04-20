import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BaseButton } from '../../../../components/common/BaseButton'
import { DeleteModal } from '../../../../components/common/DeleteModal'
import { useDeleteMedicalRecord } from '../../../../hooks/useDeleteMedicalRecord'
import { useGetMedicalRecord } from '../../../../hooks/useGetMedicalRecord'
import { PetDetail } from '../../interfaces'
import { CreateMedicalRecord } from '../CreateMedicalRecord'
import { MedicalRecord } from '../MedicalRecord'
import { VaccinesTable } from '../VaccinesTable'

export interface IVaccine {
  id: string
  name: string
  date: string
  nextDueDate: string
}

interface Props {
  pet: PetDetail
  checkIfUserIsOwner: () => boolean
  handleEditVaccine: (data: unknown) => void
  handleOpenModalDeleteVaccine: (vaccine: IVaccine) => void
}

export const HealthData: React.FC<Props> = ({
  pet,
  handleEditVaccine,
  checkIfUserIsOwner,
  handleOpenModalDeleteVaccine,
}) => {
  const { t } = useTranslation(['common', 'profilePet'])
  const [isOpenModalCreation, setIsOpenModalCreation] = useState(false)
  const [isOpenDeleteMedicalRecord, setIsOpenDeleteMedicalRecord] =
    useState(false)
  const { mutate: deleteMedicalRecordMurate } = useDeleteMedicalRecord()
  const [medicalRecordId, setMedicalRecordId] = useState<string>('')
  const { data: medicalRecord, refetch } = useGetMedicalRecord(medicalRecordId)

  const toggleCreateMedicalRecord = () => {
    setMedicalRecordId('')
    setIsOpenModalCreation(!isOpenModalCreation)
  }

  const handleEdit = (id: string) => {
    setIsOpenModalCreation(true)
    setMedicalRecordId(id)
    refetch()
  }

  const handleDeleteMedicalRecord = (id: string) => {
    setMedicalRecordId(id)
    setIsOpenDeleteMedicalRecord(true)
  }

  const deleteMedicalRecord = () => {
    deleteMedicalRecordMurate({ id: medicalRecordId })
    setIsOpenDeleteMedicalRecord(false)
    setMedicalRecordId('')
  }

  return (
    <>
      <div className="mt-5 gap-6">
        <h2 className="mt-10 text-lg font-semibold text-primary-900">
          {t('profilePet:medicalRecord')}
        </h2>
        {checkIfUserIsOwner() && (
          <div className="flex justify-end">
            <BaseButton
              text={t('profilePet:addMedicalRecord')}
              onClick={() => {
                setIsOpenModalCreation(true)
              }}
            />
          </div>
        )}
        <MedicalRecord
          handleEdit={handleEdit}
          medicalRecords={pet?.MedicalRecord}
          handleDelete={handleDeleteMedicalRecord}
        />
      </div>
      <h2 className="mt-10 text-lg font-semibold text-primary-900">{t('profilePet:vaccine')}</h2>
      {pet?.PetVaccine && (
        <VaccinesTable
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          vaccines={pet.PetVaccine || []}
          handleEditVaccine={handleEditVaccine}
          handleOpenModalDeleteVaccine={handleOpenModalDeleteVaccine}
        />
      )}
      <CreateMedicalRecord
        medicalRecord={medicalRecord}
        isOpenModalCreation={isOpenModalCreation}
        toggleCreateMedicalRecord={toggleCreateMedicalRecord}
      />
      <DeleteModal
        isOpen={isOpenDeleteMedicalRecord}
        handleClose={() =>
          setIsOpenDeleteMedicalRecord(!isOpenDeleteMedicalRecord)
        }
        title={`${t('common:areYouSureDelete')} ${t('profilePet:medicalRecord')}?`}
        handleDelete={deleteMedicalRecord}
      />
    </>
  )
}
