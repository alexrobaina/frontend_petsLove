import { CSSObject } from '@emotion/react'
import { FC } from 'react'
import Select, { StylesConfig, ActionMeta } from 'react-select'

interface Option {
  value: string
  label: string
}

interface Props {
  error?: boolean
  options: Option[]
  value: Option | null
  onChange: (option: Option | null, actionMeta: ActionMeta<Option>) => void
}

interface Option {
  value: string
  label: string
}

interface Props {
  label?: string
  error?: boolean
  options: Option[]
  value: Option | null
  onChange: (option: Option | null, actionMeta: ActionMeta<Option>) => void
}

export const BaseSelect: FC<Props> = ({
  options,
  onChange,
  value,
  error,
  label,
}) => {
  const customStyles: StylesConfig<Option, false> = {
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

  return (
    <div className="items-center ">
      {label && (
        <label className="block text-sm font-medium leading-6 text-primary-950">
          {label}
        </label>
      )}
      <Select
        isSearchable
        value={value}
        options={options}
        onChange={onChange}
        styles={customStyles}
      />
    </div>
  )
}
