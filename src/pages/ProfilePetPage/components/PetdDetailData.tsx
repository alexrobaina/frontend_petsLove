import { FC } from 'react'

type PetInfo = {
  title: string
  description: string
}

export const PetDetailData: FC<PetInfo> = ({ title, description }) => {
  return (
    <div className="transparent w-20 h-15 rounded-md flex flex-col items-center justify-center px-3 py-2 text-sm font-semibold text-primary-900 ring-1 ring-inset ring-primary-400">
      <div className="flex flex-col items-center">
        <h4 className="text-md md:text-md lg:text-md font-bold">{title}</h4>
        <p> {description}</p>
      </div>
    </div>
  )
}
