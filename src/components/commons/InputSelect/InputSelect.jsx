import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Select from 'react-select'
import styles from './inputSelect.scss'
import ViewValue from '../ViewValue'

const InputSelect = ({
  options,
  placeholder,
  isLoading,
  needValidate,
  handleChange,
  value,
  onBlur,
  isEdit,
  isMulti,
  title,
  name,
}) => {
  const handleChangeValidate = value => {
    handleChange('rol', value.value)
  }

  const handleBlur = () => {
    onBlur('rol', true)
  }

  return (
    <>
      {!isEdit && value ? (
        <ViewValue placeholder={placeholder} value={value} />
      ) : (
        <>
          <Select
            name={name}
            title={title}
            onBlur={needValidate ? handleBlur : null}
            onChange={needValidate ? handleChangeValidate : handleChange}
            className={styles.selectStyle}
            isLoading={isLoading}
            placeholder={placeholder}
            options={options}
            isRequired
            isMulti={isMulti}
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
}

InputSelect.propTypes = {
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.oneOfType([PropTypes.array]).isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  isLoading: PropTypes.bool,
  isMulti: PropTypes.bool,
}

InputSelect.defaultProps = {
  value: '',
  isLoading: false,
  isMulti: false,
}

export default observer(InputSelect)
