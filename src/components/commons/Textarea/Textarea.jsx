import React from 'react'
import PropTypes from 'prop-types'
import styles from './textarea.scss'

const Textarea = ({ handleChange, placeholder, rows, cols, isError }) => {
  return (
    <>
      <textarea
        className={styles.textarea}
        rows={rows}
        cols={cols}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {isError && <div className={styles.errorMessage}>Is required, please complete</div>}
    </>
  )
}

Textarea.propTypes = {
  cols: PropTypes.string,
  rows: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  isError: PropTypes.bool,
}

Textarea.defaultProps = {
  cols: '4',
  rows: '4',
  isError: false,
}

export default Textarea
