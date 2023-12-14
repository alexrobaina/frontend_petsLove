import { FC } from 'react'

interface Props {
  text: string
}

export const BaseAlert: FC<Props> = ({ text }) => {
  return (
    <div className="rounded-md bg-yellow-100 p-4 w-full">
      <div className="flex">
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-yellow-800">{text}</p>
        </div>
      </div>
    </div>
  )
}
