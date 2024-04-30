import { type FC, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { IconSearch } from '../../../../assets/icons'
import { MidDog } from '../../../../assets/images'
import { BaseButton } from '../../../../components/common/BaseButton'
import { BaseButtonGroups } from '../../../../components/common/BaseButtonGroups'
import { BaseInput } from '../../../../components/common/BaseInput'
import { BaseLoading } from '../../../../components/common/BaseLoading'
import { Header } from '../../../../components/common/Header'
import { Pagination } from '../../../../components/common/Pagination'
import { PetList } from '../../../../components/common/PetList/Index'
import { SocialMediaContact } from '../../../../components/common/SocialMediaContact'
import { useUserPets } from '../../../../hooks/useUserPets'

type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  image: string
  description: string
  role: string
  username: string
  socialMedia: {
    instagram?: string
    telegram?: string
    facebook?: string
    whatsapp?: string
  }
}

type Props = {
  user: User
}

const h2Class = 'text-xl md:text-xl lg:text-3xl font-semibold'

export const UserProfile: FC<Props> = ({ user }) => {
  const { t } = useTranslation(['common'])
  const [category, setPetOption] = useState('')
  const [gender, setGenderOption] = useState('')
  const [isAdopted, setAdoptionStatus] = useState('inAdoption')
  const [searchByName, setSearchByName] = useState('')
  const [page, setPage] = useState(1)
  const take = 10

  const getIsAdopted = () => {
    if (isAdopted === 'adopted') return true
    if (isAdopted === 'inAdoption') return false
    return ''
  }

  const { data: pets, isLoading } = useUserPets({
    page,
    gender,
    category,
    id: user?.id,
    searchByName,
    adopted: getIsAdopted(),
  })

  const petCategories = [
    { name: 'dogs', path: 'dog' },
    { name: 'cats', path: 'cat' },
    { name: 'birds', path: 'bird' },
    { name: 'rabbits', path: 'rabbit' },
    { name: 'exotics', path: 'exotic' },
  ]

  const genderOptions = [
    { name: 'males', path: 'male' },
    { name: 'females', path: 'female' },
  ]

  const adoptionOption = [
    { name: 'adopted', path: 'adopted' },
    { name: 'inAdoption', path: 'inAdoption' },
  ]

  const resetFiler = () => {
    setPetOption('')
    setAdoptionStatus('')
    setGenderOption('')
  }

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.onerror = null // Prevents infinite loop if local image is also not found
    target.src = MidDog
  }

  const getName = useCallback(() => {
    const { firstName, lastName, username } = user || {}
    if (username) return username
    if (firstName && lastName) return `${firstName} ${lastName}`
    if (firstName) return firstName
    if (lastName) return lastName || ''
    return ''
  }, [user])

  return (
    <>
      <div className="flex justify-between flex-col sm:flex-row mb-6">
        <header className="flex gap-5">
          <Header title={getName()} buttonBack />
        </header>
        <div className="flex items-center gap-3 mt-5 sm:mt-0">
          <div className="h-14 w-14 max-sm:h-[58px] max-sm:w-[58px] rounded-full">
            <img
              onError={handleError}
              className="rounded-full object-cover h-full w-full"
              src={`${import.meta.env.VITE_BUCKET_NAME}users/avatar/${user?.image}`}
            />
          </div>
          <div className="bg-green-300 px-2 text-end py-1 rounded-2xl">
            {t(`common:${user?.role}`)}
          </div>
        </div>
      </div>
      {user?.description && (
        <div className="my-2">
          <h2 className={h2Class}>About Us</h2>
          <p className="my-6">{user.description}</p>
        </div>
      )}
      <div className="my-2">
        <h2 className={h2Class}>{t('common:contact')}</h2>
        <div className="flex py-5 items-center">
          <SocialMediaContact user={user} />
        </div>
      </div>
      <div className="mt-5 mb-3 flex-col md:flex-row justify-between">
        <h2 className={h2Class}>{t('common:myPets')}</h2>
        <div className="flex gap-4 h-9 mt-4 md:mt-4 flex-col md:flex-row">
          <BaseButton
            size="small"
            type="button"
            style="secondary"
            onClick={resetFiler}
            text={t('common:resetFilters')}
          />
          <BaseButtonGroups
            group={petCategories}
            buttonSelected={category}
            handleSelectButtonGroup={setPetOption}
          />
          <BaseButtonGroups
            group={genderOptions}
            buttonSelected={gender}
            handleSelectButtonGroup={setGenderOption}
          />
          <BaseButtonGroups
            group={adoptionOption}
            buttonSelected={isAdopted}
            handleSelectButtonGroup={setAdoptionStatus}
          />
        </div>
      </div>
      <div className="my-5 md:mt-0 mt-44 ">
        <BaseInput
          type="text"
          value={searchByName}
          placeholder={t('common:searchByName')}
          label={t('common:searchPets')}
          iconLeft={<IconSearch />}
          handleChange={(e) => setSearchByName(e.target.value.toLowerCase())}
        />
      </div>
      {isLoading ? (
        <BaseLoading />
      ) : (
        <PetList pets={pets?.pets} isLoading={isLoading} />
      )}
      <Pagination
        page={page}
        take={take}
        setPage={setPage}
        total={pets?.length}
      />
    </>
  )
}
