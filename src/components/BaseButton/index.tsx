import { FC, MouseEventHandler, ReactElement } from 'react'
import { Loader } from '../Loader'
import { setSize, setType } from './utils'

interface Props {
  text: string
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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
}) => (
  <button
    onClick={onClick}
    style={{ backgroundColor }}
    className={` ${wFull && 'w-full'}  ${
      className && 'className'
    } py-2 px-4 rounded ${setType(type)} ${setSize(
      size,
    )} flex gap-3 items-center justify-center`}
  >
    {isLoading && <Loader />}
    {icon && icon}
    {text && text}
  </button>
)
