import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { MdCall, MdEdit, MdShare } from 'react-icons/md'
import Button from 'components/commons/Button'
import ModalContact from 'components/commons/ModalContact'
import styles from './buttonsPet.scss'

const ButtonsPet = ({ isEdit, contactProtectionistEmailStore, petIdStore }) => {
  const { name, phone } = petIdStore
  const { t } = useTranslation()

  const editPet = useCallback(() => {
    console.log('listo')
  }, [])

  return (
    <div className={styles.containerButtons}>
      {isEdit && (
        <div className={styles.btnMargin}>
          <Button icon={<MdShare size={20} />} circle text="Edit" />
        </div>
      )}
      <div className={styles.btnMargin}>
        <ModalContact
          petIdStore={petIdStore}
          text={t('buttonsPet.text', { name, phone })}
          icon={<MdCall size={20} />}
          title={t('buttonsPet.title')}
          contactProtectionistEmailStore={contactProtectionistEmailStore}
        />
      </div>
      <div className={styles.btnMargin}>
        <Button
          handleClick={editPet}
          icon={<MdEdit size={20} />}
          circle
          text={t('buttonsPet.edit')}
        />
      </div>
    </div>
  )
}

ButtonsPet.propTypes = {
  isEdit: PropTypes.bool,
}

ButtonsPet.defaultProps = {
  isEdit: false,
}

export default observer(ButtonsPet)
