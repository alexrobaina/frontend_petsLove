import { FC, MouseEventHandler, ReactElement } from 'react'

import { Loader } from '../Loader'

import { setSize, setType } from './utils'

interface Props {
  text?: string
  wFull?: boolean
  className?: string
  icon?: ReactElement
  isLoading?: boolean
  backgroundColor?: string
  size?: 'small' | 'medium' | 'large'
  type?: 'primary' | 'secondary' | 'tertiary'
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const BaseButton: FC<Props> = ({
  text,
  icon,
  wFull,
  isLoading,
  className,
  size = 'small',
  backgroundColor,
  type = 'primary',
  onClick = () => {},
}) => {
  // if only icon is passed, then the button will be a circle
  const shouldDisplayOnlyIcon = (
    text: string | null | undefined,
    icon: ReactElement | null | undefined,
  ): boolean => {
    return (!text || text.trim() === '') && !!icon
  }
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor }}
      className={` ${wFull && 'w-full'}  ${
        className && 'className'
      } py-2 px-4 rounded ${setType(type)} ${setSize(
        size,
      )} flex gap-3 items-center justify-center  ${
        shouldDisplayOnlyIcon(text, icon) &&
        'w-[30px] h-[30px] md:w-[36px] md:h-[36px] py-0 px-0'
      }`}
    >
      {isLoading && <Loader />}
      {icon && <div>{icon}</div>}
      {text && text}
    </button>
  )
}
