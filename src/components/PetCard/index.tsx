import { FC } from 'react'
import { useTranslation } from 'react-i18next'

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
}) => {
  const { t } = useTranslation(['common'])

  const setImagesFromArrayOrString = (images: string | string[] | undefined) => {
    if (Array.isArray(images)) return images[0]
    return images
  }

  return (
  <div
    onClick={() => goToProfile(id)}
    className="rounded-xl pb-3 md:w-[236px] flex bg-primary-100 shadow-md cursor-pointer"
  >
    <div>
      <div className='h-[237px] w-full' >  
        <img
          alt="pet"
          onError={(e) => {
            e.currentTarget.src = ImageNotFound
          }}
          className="md:w-[300px] h-[237px] object-cover rounded-xl"
          src={`${import.meta.env.VITE_BUCKET_NAME}pets/${setImagesFromArrayOrString(images)}`}
        />
      </div>
      <div className="flex w-full flex-col pt-3 px-3 gap-1">
        <div className="flex w-full justify-between">
          <p className="capitalize font-bold ">{name}</p>
          <p className="capitalize">{t(`common:agePet.${age}`)}</p>
        </div>
        <div>
          <div className="flex gap-2 justify-between">
            <p className="capitalize">{`${city} ${country}`}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
