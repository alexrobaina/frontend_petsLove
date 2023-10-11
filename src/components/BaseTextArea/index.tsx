import { FC, ChangeEvent } from 'react'

interface props {
  name: string
  label?: string
  value?: string
  className?: string
  textError?: string
  textHelper?: string
  placeholder?: string
  height?: string | number
  handleChange: (e: ChangeEvent) => void
}

export const BaseTextArea: FC<props> = ({
  name,
  label,
  value,
  className,
  textError,
  textHelper,
  placeholder,
  height = 200,
  handleChange,
}) => {
  const styles =
    ' resize rounded-md border-0 py-1.5 text-primary-900 shadow-sm ring-1 ring-inset ring-primary-300 outline-none placeholder:text-neutral-400 focus:ring-primary-500 sm:text-sm sm:leading-6 pl-4'

  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium leading-6 text-primary-950">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        style={{ height: `${height}px` }}
        className={`${className} 
            ${styles} 
            ${textError ? 'ring-red-500' : ''}`}
      />
      {textHelper && !textError && <p className="pl-3 pt-3">{textHelper}</p>}
      {textError && <p className="pl-3 pt-3 text-red-500">{textError}</p>}
    </div>
  )
}
