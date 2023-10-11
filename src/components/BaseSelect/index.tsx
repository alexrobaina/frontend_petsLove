import { CSSObject } from '@emotion/react'
import { FC } from 'react'
import Select, { StylesConfig } from 'react-select'

interface Option {
  value: string
  label: string
}

interface Props {
  name: string
  value: string
  label?: string
  error?: string
  options: Option[]
  isDisabled?: boolean
  isMulti?: boolean | false
  setFieldValue: (field: string, value: string) => void
}
export const BaseSelect: FC<Props> = ({
  name,
  error,
  value,
  label,
  options,
  isDisabled,
  setFieldValue,
}) => {
  const customStyles: StylesConfig<Option, false> = {
    menu: (provided: CSSObject) => ({
      ...provided,
      position: 'absolute',
      backgroundColor: 'white',
      zIndex: 1000, // also ensuring z-index here as a safety
    }),
    control: (provided: CSSObject) => ({
      ...provided,
      boxShadow: 'none',
      borderRadius: '4px',
      border: error ? '1px solid red' : '1px solid #8ad3c1',
    }),
    option: (provided: CSSObject, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#d6f1e9' // color when option is selected
        : state.isFocused
        ? '#ace3d3' // color when option is focused
        : 'white', // default color
      color: state.isSelected ? '#0d2624' : '#0d2624', // text color
    }),
  }

  const setValues = (options: Option[], value: string) =>
    options.find((option: Option) => option.value === value)

  return (
    <div className="items-center">
      {label && (
        <label className="block text-sm font-medium leading-6 text-primary-950">
          {label}
        </label>
      )}
      <Select
        isSearchable
        options={options}
        isDisabled={isDisabled}
        styles={customStyles}
        value={setValues(options, value)}
        onChange={(option) =>
          option && option.value && setFieldValue(name, option.value)
        }
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
