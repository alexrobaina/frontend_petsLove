import { FC, ChangeEvent } from 'react'

interface BaseButtonSwitchProps {
  text: string
  isActive: boolean
  onClick: (e: ChangeEvent<HTMLInputElement>) => void
}

export const BaseButtonSwitch: FC<BaseButtonSwitchProps> = ({
  text,
  isActive,
  onClick,
}) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isActive}
        onChange={onClick}
        className="sr-only peer"
      />
      <div className="relative w-11 h-6 bg-primary-100 peer-focus:outline-none peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-400"></div>
      <span className="ml-3 text-sm font-medium text-primary-900">{text}</span>
    </label>
  )
}
