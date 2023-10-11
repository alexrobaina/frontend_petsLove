import { FC, ReactElement } from 'react'

interface Props {
  text: string
  color?: string
  width?: string
  pointer?: boolean
  backgroundColor: string
  iconLeft?: ReactElement
  iconRigth?: ReactElement
}

export const BaseBadge: FC<Props> = ({
  text,
  color = 'text-primary-900',
  pointer,
  iconLeft,
  iconRigth,
  backgroundColor = 'bg-primary-300',
}) => {
  return (
    <div
      className={`${backgroundColor} ${
        pointer && 'cursor-pointer hover:bg-primary-200'
      }  justify-center flex px-3 gap-2 py-1 items-cente rounded-xl`}
    >
      {iconLeft && iconLeft}
      <p className={`text-xs font-medium ${color}`}>{text}</p>
      {iconRigth && iconRigth}
    </div>
  )
}
