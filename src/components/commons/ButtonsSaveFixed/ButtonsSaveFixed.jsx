import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { MdSave } from 'react-icons/md'
import Button from 'components/commons/Button'
import styles from './buttonsSaveFixed.scss'

const ButtonsSaveFixed = ({ handleSave }) => {
  const { t } = useTranslation('buttons')
  return (
    <div className={styles.buttonsContainer}>
      <div className={styles.button}>
        <Button handleClick={handleSave} text={t('save')} icon={<MdSave size={20} />} />
      </div>
    </div>
  )
}

ButtonsSaveFixed.propTypes = {
  handleSave: PropTypes.func.isRequired,
}

export default ButtonsSaveFixed
