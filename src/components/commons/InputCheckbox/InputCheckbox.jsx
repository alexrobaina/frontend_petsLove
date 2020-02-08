import React from 'react'
import styles from './inputCheckbox.scss'
import PropTypes from 'prop-types'
import Title from '../Title'

const InputCheckbox = ({ text, handleChange, value }) => {
  return (
    <div className={styles.containerCheckbox}>
      <label className={styles.container}>
        {text}
        <input onChange={handleChange} checked={value} type="checkbox" />
        <span className={styles.checkmark}></span>
      </label>
    </div>
  )
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default InputCheckbox
