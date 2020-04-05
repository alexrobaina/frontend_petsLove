import React from 'react'
import PropTypes from 'prop-types'
import styles from './textarea.scss'

const Textarea = ({ isEdit, value, handleChange, placeholder, rows, cols, isError }) => {
  return (
    <>
      {isEdit ? (
        <textarea
          className={styles.textarea}
          rows={rows}
          cols={cols}
          defaultValue={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
      ) : (
        <>
          {value ? (
            <>
              <label className={styles.label}>{placeholder}</label>
              <div className={styles.value}>{value}</div>
            </>
          ) : (
            <>
              <label className={styles.label}>{placeholder}</label>
              <div className={styles.value}>-</div>
            </>
          )}
        </>
      )}
      {isError && <div className={styles.errorMessage}>Is required, please complete</div>}
    </>
  )
}

Textarea.propTypes = {
  cols: PropTypes.string,
  rows: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  isError: PropTypes.bool,
  isEdit: PropTypes.bool,
}

Textarea.defaultProps = {
  cols: '4',
  rows: '4',
  value: '',
  isError: false,
  isEdit: false,
}

export default Textarea
