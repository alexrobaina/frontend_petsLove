import { type FC, useState, useCallback } from 'react'

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
import { BUCKET_AVATAR_USER } from '../../../../constants/buketsImage'
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
    { name: 'Dogs', path: 'dog' },
    { name: 'Cats', path: 'cat' },
    { name: 'Exotics', path: 'exotic' },
  ]

  const genderOptions = [
    { name: 'Male', path: 'male' },
    { name: 'Female', path: 'female' },
  ]

  const adoptionOption = [
    { name: 'Adopted', path: 'adopted' },
    { name: 'In Adoption', path: 'inAdoption' },
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
      <div className="flex justify-between mb-6">
        <header className="flex gap-5">
          <Header title={getName()} buttonBack />
        </header>
        <div className="flex items-center gap-3">
          <div className="bg-green-300 px-2 text-end py-1 rounded-2xl">
            {user?.role}
          </div>
          <div className="h-14 w-14 max-sm:h-[58px] max-sm:w-[58px] rounded-full">
            <img
              className="rounded-full"
              onError={handleError}
              src={`${BUCKET_AVATAR_USER}${user?.image}`}
            />
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
        <h2 className={h2Class}>Contact</h2>
        <div className="flex py-5 items-center">
          <SocialMediaContact user={user} />
        </div>
      </div>
      <div className="mt-5 mb-3 flex justify-between">
        <h2 className={h2Class}>My Pets</h2>
        <div className="flex gap-4 h-9">
          <BaseButton
            size="small"
            type="button"
            style="secondary"
            text="Reset filters"
            onClick={resetFiler}
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
      <div className="my-5">
        <BaseInput
          type="text"
          value={searchByName}
          placeholder="Search"
          label="Search by name"
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
