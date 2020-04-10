import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { MdEdit, MdSave } from 'react-icons/md'
import Button from 'components/commons/Button'
import styles from './buttonsSaveFixed.scss'

const ButtonsSaveFixed = ({ handleSave, isEdit, onlySave, handleCancelEdit, handleEdit }) => {
  const { t } = useTranslation('common')
  return (
    <div className={styles.buttonsContainer}>
      {onlySave && (
        <div className={styles.button}>
          <Button handleClick={handleSave} text={t('save')} icon={<MdSave size={20} />} />
        </div>
      )}
      {isEdit ? (
        <>
          <div className={styles.button}>
            <Button handleClick={handleSave} text={t('save')} icon={<MdSave size={20} />} />
          </div>
          <div className={styles.button}>
            <Button handleClick={handleCancelEdit} text={t('cancel')} icon={<MdEdit size={20} />} />
          </div>
        </>
      ) : (
        <>
          {!onlySave && (
            <div className={styles.button}>
              <Button handleClick={handleEdit} text={t('edit')} icon={<MdEdit size={20} />} />
            </div>
          )}
        </>
      )}
    </div>
  )
}

ButtonsSaveFixed.propTypes = {
  isEdit: PropTypes.bool,
  onlySave: PropTypes.bool,
}

ButtonsSaveFixed.defaultProps = {
  isEdit: false,
  onlySave: false,
}

export default ButtonsSaveFixed
