import { CSSObject } from '@emotion/react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Select, { MultiValue, StylesConfig } from 'react-select'
import CreatableSelect from 'react-select/creatable'

interface Option {
  value: string
  label: string
}

interface Props {
  name: string
  label?: string
  error?: string
  options?: Option[]
  value: string | []
  placeholder?: string
  isDisabled?: boolean
  translation?: boolean
  isCreatable?: boolean
  isClearable?: boolean
  isMulti?: boolean | false
  setFieldValue: (
    field: string,
    value: string | number | File | null | MultiValue<unknown>,
  ) => void
}
export const BaseSelect: FC<Props> = ({
  name,
  error,
  value,
  label,
  options,
  isDisabled,
  translation,
  placeholder,
  setFieldValue,
  isCreatable = false,
  isClearable = true,
}) => {
  const { t } = useTranslation()

  const translatedOptions = options?.map((option) => ({
    ...option,
    label: translation ? t(`common:${option.label}`) : option.label,
  }))

  const customStyles: StylesConfig<Option, false> = {
    menu: (provided: CSSObject) => ({
      ...provided,
      position: 'absolute',
      backgroundColor: 'white',
      zIndex: 98, // also ensuring z-index here as a safety
    }),
    clearIndicator: (provided) => ({
      ...provided,
      zIndex: 99,
    }),
    control: (provided: CSSObject) => ({
      ...provided,
      fontSize: '14px',
      boxShadow: 'none',
      borderRadius: '4px',
      border: error ? '1px solid red' : '1px solid #4fb29c',
      height: '36px',
      minHeight: '20px',
      '&:hover': {
        border: '1px solid #4fb29c',
      },
      '&:focus': {
        border: '1px solid red',
      },
    }),
    option: (provided: CSSObject, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#d6f1e9' // color when option is selected
        : state.isFocused
          ? '#ace3d3' // color when option is focused
          : '#fff', // default color
      color: state.isSelected ? '#0d2624' : '#0d2624', // text color
      '&:active': {
        backgroundColor: '#ace3d3',
      },
    }),
  }

  const setValues = (options: Option[], value: string | []) => {
    if (Array.isArray(value)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return options.filter((option) => value.includes(option?.value))
    } else {
      return options.find((option) => option.value === value) || null
    }
  }

  return (
    <div className="items-center">
      {label && (
        <label className="block text-sm font-medium leading-6 text-primary-950">
          {label}
        </label>
      )}
      {isCreatable ? (
        <CreatableSelect
          isMulti
          placeholder={placeholder}
          onChange={(option) => {
            setFieldValue && setFieldValue(name, option)
          }}
        />
      ) : (
        <Select
          isSearchable
          isClearable={isClearable}
          styles={customStyles}
          isDisabled={isDisabled}
          placeholder={placeholder}
          options={translatedOptions}
          value={translatedOptions && setValues(translatedOptions, value)}
          onChange={(option) => {
            setFieldValue(name, option ? option.value : null)
          }}
        />
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
