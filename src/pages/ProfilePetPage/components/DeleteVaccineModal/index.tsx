import { FC } from 'react'

import { BaseButton } from '../../../../components/common/BaseButton'
import { ReactModal } from '../../../../components/common/ReactModal'

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
  isOpenDeleteVaccine: boolean
  handleDeleteVaccine: () => void
  handleCloseDeleteVaccineModal: () => void
}

export const DeleteVaccineModal: FC<Props> = ({
  vaccine,
  isOpenDeleteVaccine,
  handleDeleteVaccine,
  handleCloseDeleteVaccineModal,
}) => {
  return (
    <ReactModal
      title={`Are your sure you want to delete the vaccine ${vaccine?.Vaccine.name}?`}
      isOpen={isOpenDeleteVaccine}
      closeModal={handleCloseDeleteVaccineModal}
    >
      <div className="flex justify-end mt-5 gap-2 md:gap-0">
        <BaseButton
          text="Cancel"
          style="secondary"
          onClick={handleCloseDeleteVaccineModal}
        />
        <BaseButton
          text="Delete"
          style="delete"
          onClick={handleDeleteVaccine}
        />
      </div>
    </ReactModal>
  )
}
