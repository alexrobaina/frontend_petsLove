import React from 'react'
import PropTypes from 'prop-types'
import styles from './textarea.scss'

const Textarea = ({ handleChange, placeholder, rows, cols }) => {
  return (
    <textarea
      className={styles.input}
      rows={rows}
      cols={cols}
      placeholder={placeholder}
      onChange={handleChange}
    />
  )
}

Textarea.propTypes = {
  cols: PropTypes.string,
  rows: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
}

Textarea.defaultProps = {
  cols: '4',
  rows: '4',
}

export default Textarea
