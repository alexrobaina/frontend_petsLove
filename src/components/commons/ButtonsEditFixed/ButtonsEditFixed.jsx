import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { MdEdit, MdSave } from 'react-icons/md'
import Button from 'components/commons/Button'
import styles from './buttonsEditFixed.scss'

const ButtonsEditFixed = ({ handleSave, isEdit, handleCancelEdit, handleEdit }) => {
  const { t } = useTranslation('buttons')
  return (
    <div className={styles.buttonsContainer}>
      {!isEdit && (
        <div className={styles.button}>
          <Button handleClick={handleEdit} text={t('edit')} icon={<MdEdit size={20} />} />
        </div>
      )}
      {isEdit && (
        <>
          <div className={styles.button}>
            <Button handleClick={handleSave} text={t('save')} icon={<MdSave size={20} />} />
          </div>
          <div className={styles.button}>
            <Button handleClick={handleCancelEdit} text={t('cancel')} icon={<MdEdit size={20} />} />
          </div>
        </>
      )}
    </div>
  )
}

ButtonsEditFixed.propTypes = {
  isEdit: PropTypes.bool,
}

ButtonsEditFixed.defaultProps = {
  isEdit: false,
}

export default ButtonsEditFixed
