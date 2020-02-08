import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import styles from './inputSelect.scss'

const InputSelect = ({ options, placeholder, isLoading, handleChange }) => (
  <>
    <Select
      onChange={handleChange}
      className={styles.selectStyle}
      isLoading={isLoading}
      placeholder={placeholder}
      options={options}
      isRequired
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          neutral30: '#8E99F3',
          neutral20: '#FFD95A',
          primary50: '#8E99F3',
          primary: '#FFD95A',
        },
      })}
    />
  </>
)

InputSelect.propTypes = {
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

InputSelect.defaultProps = {
  isLoading: false,
}

export default InputSelect
