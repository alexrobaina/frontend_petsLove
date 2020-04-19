import React from 'react'
import PropTypes from 'prop-types'
import ViewValue from 'components/commons/ViewValue'
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
        <ViewValue placeholder={placeholder} value={value} />
      )}
      {isError && <div className={styles.errorMessage}>Is required, please complete</div>}
    </>
  )
}

Textarea.propTypes = {
  cols: PropTypes.number,
  rows: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  isError: PropTypes.bool,
  isEdit: PropTypes.bool,
}

Textarea.defaultProps = {
  cols: 4,
  rows: 4,
  value: '',
  isError: false,
  isEdit: false,
}

export default Textarea
