import { FC } from 'react'

import { IPetCardProps } from '../../constants/types'

export const PetCard: FC<IPetCardProps> = ({
  id,
  age,
  name,
  city,
  gender,
  images,
  goToProfile,
}) => (
  <div
    onClick={() => goToProfile(id)}
    className="rounded-xl h-[318px] flex w-[280px] bg-primary-100 shadow-md cursor-pointer"
  >
    <div>
      <img
        alt="pet"
        src={images[0]}
        className="h-[237px] w-[280px] object-cover rounded-xl"
      />
      <div className="flex w-full flex-col pt-3 px-4 gap-1">
        <div className="flex w-full justify-between">
          <p className="capitalize font-bold ">{name}</p>
          <p className="capitalize">{gender}</p>
        </div>
        <div>
          <div className="flex gap-2 justify-between">
            <p className="capitalize">{age}</p>
            <p className="capitalize">{city}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)
