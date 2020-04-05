import React from 'react'
import PropTypes from 'prop-types'
import Title from 'components/commons/Title'
import styles from './inputCheckbox.scss'

const InputCheckbox = ({ isEdit, text, handleChange, value }) => {
  return (
    <>
      {isEdit && (
        <label className={styles.container}>
          {text}
          <input onChange={handleChange} type="checkbox" />
          <span className={styles.checkmark} />
        </label>
      )}
      <>
        {isEdit === false && (
          <>
            <label className={styles.label}>{text}</label>
            {value ? (
              <div className={styles.value}>Yes</div>
            ) : (
              <div className={styles.value}>No</div>
            )}
          </>
        )}
      </>
    </>
  )
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  isEdit: PropTypes.bool,
}

Title.defaultProps = {
  value: '',
  isEdit: false,
}

export default InputCheckbox
