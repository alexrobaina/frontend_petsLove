import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Select from 'react-select'
import styles from './inputSelect.scss'
import ViewValue from '../ViewValue'

const InputSelect = ({ options, placeholder, isLoading, handleChange, value, isEdit }) => (
  <>
    {!isEdit && value ? (
      <ViewValue placeholder={placeholder} value={value} />
    ) : (
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
    )}
  </>
)

InputSelect.propTypes = {
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.oneOfType([PropTypes.array]).isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  isLoading: PropTypes.bool,
}

InputSelect.defaultProps = {
  value: '',
  isLoading: false,
}

export default observer(InputSelect)
