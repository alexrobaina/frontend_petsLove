import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { PetCardType } from '../../../constants/types'
import { PetCard } from '../../PetCard'
import { BaseAlert } from '../BaseAlert'
import { BaseLoading } from '../BaseLoading'

interface Props {
  pets: PetCardType[]
  isLoading: boolean
}

export const PetList: FC<Props> = ({ pets, isLoading }) => {
  const { t } = useTranslation(['common'])
  const navigate = useNavigate()

  const goToProfilePet = (id: string) => {
    navigate(`/pet/${id}`)
  }

  return (
    <div className="flex mt-5 flex-wrap gap-5 justify-center sm:justify-between w-full">
      {isLoading && (
        <div className="flex items-center justify-center w-full mt-32">
          <BaseLoading large />
        </div>
      )}
      {pets?.length === 0 && <BaseAlert text={t('common:petAvailable')} />}
      {pets &&
        pets.map((pet: PetCardType) => (
          <PetCard
            id={pet.id}
            key={pet.id}
            age={pet.age}
            name={pet.name}
            images={pet.images}
            category={pet?.category}
            city={pet?.location?.city}
            goToProfile={goToProfilePet}
            country={pet?.location?.country}
          />
        ))}
    </div>
  )
}
