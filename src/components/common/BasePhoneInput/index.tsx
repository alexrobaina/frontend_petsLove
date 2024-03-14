import { FC } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface Props {
  name: string
  value: string
  error?: string
  label?: string
  country: string
  placeholder: string
  isdisabled?: boolean
  setFieldValue: (value: string, name: string) => void
}

export const BasePhoneInput: FC<Props> = ({
  name,
  value,
  label,
  error,
  isdisabled,
  placeholder,
  country,
  setFieldValue,
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium leading-6 text-primary-950">
          {label}
        </label>
      )}
      <div className="w-full">
        <PhoneInput
          country={country}
          value={value}
          disabled={isdisabled}
          placeholder={placeholder}
          onChange={(value: string) => setFieldValue(name, value)}
          buttonClass="bg-primary-950"
          containerStyle={{ width: '100%' }}
          inputStyle={{ width: '100%', border: 'none' }}
          inputClass={`${
            error && 'ring-red-500'
          } block rounded-md border-0 py-1.5 text-primary-900 border-none shadow-none
          shadow-sm ring-1 ring-inset ring-primary-400 outline-none placeholder:text-neutral-400 focus:ring-primary-300 sm:text-sm sm:leading-6`}
        />
        {error && (
          <p className="text-red-500 text-xs mt-1">Invalid phone number</p>
        )}
      </div>
    </div>
  )
}
