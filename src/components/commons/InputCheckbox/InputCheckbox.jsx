import React from 'react'
import PropTypes from 'prop-types'
import Title from 'components/commons/Title'
import styles from './inputCheckbox.scss'

const InputCheckbox = ({ text, handleChange, value }) => {
  return (
    <div className={styles.containerCheckbox}>
      <label className={styles.container}>
        {text}
        <input onChange={handleChange} checked={value} type="checkbox" />
        <span className={styles.checkmark} />
      </label>
    </div>
  )
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default InputCheckbox
