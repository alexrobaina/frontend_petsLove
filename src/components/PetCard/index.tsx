import { FC } from 'react'

import { ImageNotFound } from '../../assets/images'
import { IPetCardProps } from '../../constants/types'

export const PetCard: FC<IPetCardProps> = ({
  id,
  age,
  name,
  city,
  images,
  country,
  goToProfile,
}) => (
  <div
    onClick={() => goToProfile(id)}
    className="rounded-xl h-[318px] w-[236px] flex bg-primary-100 shadow-md cursor-pointer"
  >
    <div>
      <img
        alt="pet"
        onError={(e) => {
          e.currentTarget.src = ImageNotFound
        }}
        className="h-[237px] object-cover rounded-xl"
        src={`${import.meta.env.VITE_BUCKET_NAME}pets/${images}`}
      />
      <div className="flex w-full flex-col pt-3 px-3 gap-1">
        <div className="flex w-full justify-between">
          <p className="capitalize font-bold ">{name}</p>
          <p className="capitalize">{age}</p>
        </div>
        <div>
          <div className="flex gap-2 justify-between">
            <p className="capitalize">{`${city} ${country}`}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)
