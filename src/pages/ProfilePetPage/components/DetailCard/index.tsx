import { FC } from 'react'

type PetInfo = {
  title: string
  description: string
}

export const DetailCard: FC<PetInfo> = ({ title, description }) => {
  return (
    <div className="shadow-lg w-20 h-15 rounded-md min-w-[110px] bg-primary-50 flex flex-col items-center justify-center px-3 py-2 text-sm  text-primary-900 ring-1 ring-inset ring-primary-400">
      <div className="flex flex-col items-center">
        <h4 className="text-md md:text-md lg:text-md font-semibold">{title}</h4>
        <p className="capitalize text-xs md:text-sm lg:text-sm font-normal text-primary-800">
          {description}
        </p>
      </div>
    </div>
  )
}
