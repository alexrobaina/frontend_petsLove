import moment from 'moment'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { BaseButton } from '../../../common/BaseButton'
import { ReactModal } from '../../../common/ReactModal'
import { Appointment } from '../../types'

interface Props {
  isOpen: boolean
  onClose: () => void
  handleClose: () => void
  appointment: Appointment | null
  onEdit: (value: boolean) => void
  onDelete: (value: boolean) => void
}

export const AppointmentDetailsModal: FC<Props> = ({
  onEdit,
  onClose,
  onDelete,
  appointment,
}) => {
  const { t } = useTranslation()
  return (
    <ReactModal
      buttonClose
      closeModal={onClose}
      isOpen={appointment !== null}
      title={appointment?.title || ''}
    >
      <div>
        <div className="flex w-full mt-8 gap-8">
          <p>{`${t('common:day')}: ${moment(appointment?.startDate).format('DD/MM/YYYY')}`}</p>
          <p>{`${t('common:hour')}: ${moment(appointment?.startDate).format('hh:mm')}`}</p>
        </div>
        <p className="mt-4">{appointment?.description}</p>
        <div className="flex justify-start mt-8 flex-col gap-2">
          <div className="flex justify-end gap-2">
            <BaseButton
              size="small"
              style="delete"
              text={t('common:delete')}
              onClick={() => onDelete(true)}
            />
            <BaseButton
              size="small"
              onClick={onClose}
              text={t('common:save')}
            />
            <BaseButton
              size="small"
              text={t('common:edit')}
              onClick={() => onEdit(true)}
            />
          </div>
        </div>
      </div>
    </ReactModal>
  )
}
