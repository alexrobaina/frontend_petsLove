import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import Select from 'react-select'
import InputStore from 'stores/InputStore'
import ViewValue from '../ViewValue'
import styles from './inputSelect.scss'

const InputSelect = ({
  inputStore,
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
    const { t } = useTranslation('errorInputs')
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
                neutral20: inputStore && inputStore.error ? '#f44336' : '#FFD95A',
                primary50: '#8E99F3',
                primary: '#FFD95A',
              },
            })}
          />
          {inputStore && <div className={styles.errorMessage}>{inputStore.errorMessage}</div>}
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
  inputStore: PropTypes.instanceOf(InputStore),
}

InputSelect.defaultProps = {
  value: '',
  isLoading: false,
  isMulti: false,
  inputStore: null,
}

export default observer(InputSelect)
