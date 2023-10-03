import { FC, MouseEventHandler, ReactElement } from 'react'

import { Loader } from '../Loader'

import { setSize, setType } from './utils'

interface Props {
  text?: string
  wFull?: boolean
  className?: string
  icon?: ReactElement
  isLoading?: boolean
  isDisabled?: boolean
  backgroundColor?: string
  size?: 'small' | 'medium' | 'large'
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset' | undefined
  style?: 'primary' | 'secondary' | 'tertiary' | 'delete'
}

export const BaseButton: FC<Props> = ({
  text,
  icon,
  wFull,
  isLoading,
  className,
  isDisabled,
  size = 'small',
  backgroundColor,
  type = 'button',
  style = 'primary',
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
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      style={{ backgroundColor }}
      className={` ${wFull && 'w-full'}  ${
        className && 'className'
      } py-2 px-4 rounded ${setType(style)} ${setSize(
        size,
      )} flex gap-3 items-center justify-center  ${
        shouldDisplayOnlyIcon(text, icon) &&
        'w-[30px] h-[30px] md:w-[36px] md:h-[36px] py-0 px-0'
      }
      ${
        isDisabled && 
        'bg-gray-300 cursor-not-allowed hover:bg-gray-300 hover:shadow-none'
      }
      `}
    >
      {isLoading && <Loader />}
      {icon && <div>{icon}</div>}
      {text && text}
    </button>
  )
}
