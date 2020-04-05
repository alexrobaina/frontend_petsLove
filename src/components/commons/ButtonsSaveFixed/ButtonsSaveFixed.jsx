import React from 'react'
import PropTypes from 'prop-types'
import { MdEdit, MdSave } from 'react-icons/md'
import EditUserStore from 'stores/EditUserStore'
import Button from 'components/commons/Button'
import styles from './buttonsSaveFixed.scss'

const ButtonsSaveFixed = ({ handleSave, editUserStore, handleCancelEdit, handleEdit }) => {
  return (
    <div className={styles.buttonsContainer}>
      <div className={styles.button}>
        <Button handleClick={handleSave} text="Save Change" icon={<MdSave size={20} />} />
      </div>
      {editUserStore.isEdit ? (
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
  editUserStore: PropTypes.instanceOf(EditUserStore).isRequired,
}

export default ButtonsSaveFixed
