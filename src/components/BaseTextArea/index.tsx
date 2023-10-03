import { FC, ChangeEvent } from 'react'

interface props {
  value?: string
  className?: string
  height?: string | number
  textHelper?: string
  textError?: string
  handleChange: (e: ChangeEvent) => void
}

export const BaseTextArea: FC<props> = ({
  value,
  className,
  height,
  textHelper,
  textError,
  handleChange,
}) => {
  const styles =
    ' resize rounded-md border-0 py-1.5 text-primary-900 shadow-sm ring-1 ring-inset ring-primary-300 outline-none placeholder:text-neutral-400 focus:ring-primary-500 sm:text-sm sm:leading-6 pl-4'

  return (
    <>
      <textarea
        onChange={handleChange}
        value={value}
        style={{ height: `${height}px` }}
        className={`${className} 
            ${styles} 
            ${textError ? 'ring-red-500' : ''}`}
      />
      {textHelper && !textError && <p className="pl-3 pt-3">* {textHelper}</p>}
      {textError && <p className="pl-3 pt-3 text-red-500">* {textError}</p>}
    </>
  )
}
