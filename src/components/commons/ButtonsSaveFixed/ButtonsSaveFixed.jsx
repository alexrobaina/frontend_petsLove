import React from 'react'
import PropTypes from 'prop-types'
import { MdEdit, MdSave } from 'react-icons/md'
import Button from 'components/commons/Button'
import styles from './buttonsSaveFixed.scss'

const ButtonsSaveFixed = ({ handleSave, isEdit, handleCancelEdit, handleEdit }) => {
  return (
    <div className={styles.buttonsContainer}>
      <div className={styles.button}>
        <Button handleClick={handleSave} text="Save Change" icon={<MdSave size={20} />} />
      </div>
      {isEdit ? (
        <div className={styles.button}>
          <Button handleClick={handleCancelEdit} text="Cancel Edit" icon={<MdEdit size={20} />} />
        </div>
      ) : (
        <div className={styles.button}>
          <Button handleClick={handleEdit} text="Edit" icon={<MdEdit size={20} />} />
        </div>
      )}
    </div>
  )
}

ButtonsSaveFixed.propTypes = {
  store: PropTypes.node.isRequired,
  isEdit: PropTypes.bool.isRequired,
}

export default ButtonsSaveFixed
