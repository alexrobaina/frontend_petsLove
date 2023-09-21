import { FC, ReactElement } from 'react'

interface Props {
  text: string
  pointer?: boolean
  iconLeft?: ReactElement
  iconRigth?: ReactElement
}

export const BaseBadge: FC<Props> = ({
  iconLeft,
  text,
  iconRigth,
  pointer,
}) => {
  return (
    <div
      className={`${
        pointer && 'cursor-pointer hover:bg-primary-200'
      }  justify-center flex px-3 gap-2 py-1 items-center bg-primary-300 rounded-xl`}
    >
      {iconLeft && iconLeft}
      <p className="text-xs font-medium text-primary-950">{text}</p>
      {iconRigth && iconRigth}
    </div>
  )
}
