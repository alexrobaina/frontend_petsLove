import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import { MdCall, MdEdit, MdShare } from 'react-icons/md'
import Button from 'components/commons/Button'
import ModalContact from 'components/commons/ModalContact'
import styles from './buttonsPet.scss'

const ButtonsPet = ({ isEdit }) => {
  const { t } = useTranslation()
  return (
    <div className={styles.containerButtons}>
      {isEdit && (
        <div className={c(styles.button, styles.btnMargin)}>
          <Button icon={<MdShare size={20} />} circle text="Edit" />
        </div>
      )}
      <div className={c(styles.button, styles.btnMargin)}>
        <ModalContact
          text={t('buttonsPet.text')}
          icon={<MdCall size={20} />}
          title={t('buttonsPet.title')}
          textButtonOpen="Adopt pet"
        />
      </div>
      <div className={c(styles.button, styles.btnMargin)}>
        <Button icon={<MdEdit size={20} />} circle text={t('buttonsPet.edit')} />
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

export default ButtonsPet
