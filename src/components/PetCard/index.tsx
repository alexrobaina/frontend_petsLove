import { FC } from 'react'

import { ImageNotFound } from '../../assets/images'
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
    className="rounded-xl h-[318px] flex bg-primary-100 shadow-md cursor-pointer w-fit"
  >
    <div>
      <img
        alt="pet"
        onError={(e) => {
          e.currentTarget.src = ImageNotFound
        }}
        className="h-[237px] object-cover rounded-xl"
        src={`${import.meta.env.VITE_BUCKET_NAME}${images[0]}`}
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
