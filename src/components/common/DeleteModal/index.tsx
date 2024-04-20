import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { BaseButton } from '../BaseButton'
import { ReactModal } from '../ReactModal'

interface Props {
  title: string
  isOpen: boolean
  handleClose: () => void
  handleDelete: () => void
}

export const DeleteModal: FC<Props> = ({
  title,
  isOpen,
  handleClose,
  handleDelete,
}) => {
  const { t } = useTranslation(['common'])
  return (
    <ReactModal title={title} closeModal={handleClose} isOpen={isOpen}>
      <div className="flex justify-end mt-5 gap-2 md:gap-0">
        <BaseButton text={t('common:cancel')} style="secondary" onClick={handleClose} />
        <BaseButton text={t('common:delete')} style="delete" onClick={handleDelete} />
      </div>
    </ReactModal>
  )
}
