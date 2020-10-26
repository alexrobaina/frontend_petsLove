import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { MdEdit, MdSave } from 'react-icons/md'
import Button from 'components/commons/Button'
import styles from './buttonsEditFixed.scss'

const ButtonsEditFixed = ({
  isEdit,
  onlySave,
  isLoading,
  handleSave,
  handleEdit,
  handleCancelEdit,
}) => {
  const { t } = useTranslation()

  return (
    <div className={styles.buttonsContainer}>
      {!isEdit && (
        <div className={styles.button}>
          <Button handleClick={handleEdit} text={t('edit')} icon={<MdEdit size={20} />} />
        </div>
      )}
      {isEdit && (
        <>
          {!onlySave && (
            <div className={styles.button}>
              <Button
                handleClick={handleCancelEdit}
                text={t('cancel')}
                icon={<MdEdit size={20} />}
              />
            </div>
          )}
          <div className={styles.button}>
            <Button
              text={t('save')}
              disable={isLoading}
              handleClick={handleSave}
              icon={<MdSave size={20} />}
            />
          </div>
        </>
      )}
    </div>
  )
}

ButtonsEditFixed.propTypes = {
  isEdit: PropTypes.bool,
  onlySave: PropTypes.bool,
  isLoading: PropTypes.bool,
}

ButtonsEditFixed.defaultProps = {
  isEdit: false,
  onlySave: false,
  isLoading: false,
}

export default observer(ButtonsEditFixed)
