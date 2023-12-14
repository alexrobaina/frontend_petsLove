import { FC, ChangeEvent } from 'react'

interface props {
  name: string
  label?: string
  value?: string
  className?: string
  error?: string
  textHelper?: string
  placeholder?: string
  height?: string | number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (e: ChangeEvent<any>) => void
}

export const BaseTextArea: FC<props> = ({
  name,
  label,
  value,
  error,
  className,
  placeholder,
  height = 200,
  handleChange,
}) => {
  const styles = `resize rounded-md border-0 py-2 text-primary-900 shadow-sm ring-1 ring-inset ring-primary-300 outline-none 
     focus:ring-primary-500 sm:text-sm sm:leading-6 pl-3 placeholder:text-neutral-500 placeholder:text-sm`

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
            ${error ? 'ring-red-500' : ''}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
