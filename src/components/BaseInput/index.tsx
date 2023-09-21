import { ChangeEvent, FC, ReactElement } from 'react'

interface Props {
  type?: string
  error?: string
  label?: string
  placeholder: string
  value: string | number
  iconLeft?: ReactElement
  iconRigth?: ReactElement
  handleChange: (value: ChangeEvent<HTMLInputElement>) => void
}

export const BaseInput: FC<Props> = (
  {
    value,
    label,
    error,
    iconLeft,
    iconRigth,
    placeholder,
    handleChange,
    type = 'text',
  },
  props,
) => {
  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium leading-6 text-primary-950">
          {label}
        </label>
      )}
      <input
        id="email"
        {...props}
        type={type}
        name="email"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${
          error && 'ring-red-500'
        } block w-full rounded-md border-0 py-1.5 text-primary-900 shadow-sm ring-1 ring-inset ring-primary-400 outline-none
                 placeholder:text-neutral-400 focus:ring-primary-300 sm:text-sm sm:leading-6 pl-4`}
      />
      {iconLeft && <div>{iconLeft}</div>}
      {iconRigth && <div>{iconRigth}</div>}
      {error && (
        <div className="pointer-events-none absolute right-0 top-8 flex items-center pr-3">
          <svg
            className="h-5 w-5 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  )
}
