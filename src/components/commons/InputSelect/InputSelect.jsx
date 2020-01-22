import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import Select from 'react-select'
import styles from './inputSelect.module.scss'

const InputSelect = ({ isDirty, options, placeholder, isLoading, handleChange }) => (
  <Fragment>
    <Select
      onChange={handleChange}
      className={c(styles.selectStyle)}
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
    {isDirty ? <div className={styles.error}>This select is required</div> : false}
  </Fragment>
)

InputSelect.propTypes = {
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default InputSelect
