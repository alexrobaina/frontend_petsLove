import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Select from 'react-select'
import InputStore from 'stores/InputStore'
import { useTranslation } from "react-i18next";
import ViewValue from 'components/commons/ViewValue'
import Label from 'components/commons/Label'
import styles from './inputSelect.scss'

const InputSelect = ({
  name,
  title,
  value,
  label,
  isEdit,
  isMulti,
  options,
  isLoading,
  inputStore,
  placeholder,
  isClearable,
  handleChange,
}) => {
  const { t } = useTranslation()
  const customStyles = {
    control: base => ({
      ...base,
      height: 41,
      minHeight: 41,
    }),
  }
  
  return (
    <>
      {label && <Label text={label} />}
      {!isEdit && value ? (
        <ViewValue placeholder={placeholder} value={value} />
      ) : (
        <>
          <Select
            isRequired
            name={name}
            title={title}
            isMulti={isMulti}
            options={options}
            styles={customStyles}
            isLoading={isLoading}
            onChange={handleChange}
            placeholder={placeholder}
            isClearable={isClearable}
            value={options.filter(option => option.value === value)}
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
          {inputStore && <div className={styles.errorMessage}>{t(`${inputStore.errorMessage}`)}</div>}
        </>
      )}
    </>
  )
}

InputSelect.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  isMulti: PropTypes.bool,
  isLoading: PropTypes.bool,
  isClearable: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  inputStore: PropTypes.instanceOf(InputStore),
  options: PropTypes.arrayOf(PropTypes.object),
}

InputSelect.defaultProps = {
  value: '',
  label: '',
  options: {},
  isMulti: false,
  inputStore: null,
  isLoading: false,
  isClearable: false,
}

export default observer(InputSelect)
