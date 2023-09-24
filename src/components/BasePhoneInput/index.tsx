import { FC } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface Props {
  name: string
  value: string
  error?: string
  label?: string
  isdisabled?: boolean
  handleChange: (value: string, name: string) => void
}

export const BasePhoneInput: FC<Props> = ({
  name,
  value,
  label,
  error,
  isdisabled,
  handleChange,
}) => {
  const handleChangePhone = (value: string) => {
    handleChange(value, name)
  }
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium leading-6 text-primary-950">
          {label}
        </label>
      )}
      <div className="w-full">
        <PhoneInput
          country="ar"
          value={value}
          disabled={isdisabled}
          onChange={handleChangePhone}
          inputClass={`${
            error && 'ring-red-500'
          } block rounded-md border-0 py-1.5 text-primary-900 border-none shadow-none 
          shadow-sm ring-1 ring-inset ring-primary-400 outline-none placeholder:text-neutral-400 focus:ring-primary-300 sm:text-sm sm:leading-6`}
          buttonClass="bg-primary-950"
          inputStyle={{ width: '100%', border: 'none' }}
          containerStyle={{ width: '100%' }}
        />
        {error && (
          <p className="text-red-500 text-xs mt-1">Invalid phone number</p>
        )}
      </div>
    </div>
  )
}
