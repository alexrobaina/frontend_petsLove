import { type FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  IconFacebook,
  IconInstagram,
  IconSearch,
  IconTelegram,
  IconWhatsapp,
} from '../../assets/icons'
import { BaseButton } from '../common/BaseButton'
import { BaseButtonGroups } from '../common/BaseButtonGroups'
import { BaseInput } from '../common/BaseInput'
import { Header } from '../common/Header'
import { Pagination } from '../common/Pagination'
import { PetCard } from '../PetCard'

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

type Pet = {
  id: string
  name: string
  gender: string
  size: string
  age: string
  image: string
}

type Props = {
  user: User
  pets: Pet[]
  search: string
  searchFn: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const h2Class = 'text-4xl font-bold'

export const UserProfile: FC<Props> = ({ user, pets, search, searchFn }) => {
  const navigate = useNavigate()

  const [petOption, setPetOption] = useState('Dogs')
  const pet = [
    { name: 'Dogs', path: 'dogs' },
    { name: 'Cats', path: 'cats' },
    { name: 'Exotics', path: 'exotics' },
  ]

  const [genderOption, setGenderOption] = useState('Male')
  const gender = [
    { name: 'Male', path: 'male' },
    { name: 'Female', path: 'female' },
  ]

  const [adoptionStatus, setAdoptionStatus] = useState('Adopted')
  const adoptionOption = [
    { name: 'Adopted', path: 'yes' },
    { name: 'In Adoption', path: 'progress' },
  ]

  const resetFiler = () => {
    setPetOption('')
    setAdoptionStatus('')
    setGenderOption('')
  }

  const [skip, setSkip] = useState(1)
  const [take] = useState(1)

  return (
    <>
      <div className="flex justify-between mb-6">
        <header className="flex gap-5">
          <Header title={`${user.firstName} ${user.lastName}`} buttonBack />
        </header>
        <div className="flex items-center gap-3">
          <div className="bg-green-300 px-3 py-1 rounded-2xl">{user.role}</div>
          <div className="h-14 w-14 max-sm:h-[58px] max-sm:w-[58px] rounded-full">
            <img src={user.image} className="rounded-full" />
          </div>
        </div>
      </div>
      <br />

      <div className="my-2">
        <h2 className={h2Class}>About Us</h2>
        <p className="my-6">{user.description}</p>
      </div>
      <br />

      <div className="my-2">
        <h2 className={h2Class}>Contact</h2>
        <p className="flex gap-2 my-4">
          {user.socialMedia.instagram && (
            <a href={`${user.socialMedia.instagram}`}>
              <IconInstagram />
            </a>
          )}
          {user.socialMedia.facebook && (
            <a href={`${user.socialMedia.facebook}`}>
              <IconFacebook />
            </a>
          )}
          {user.socialMedia.whatsapp && (
            <a href={`${user.socialMedia.whatsapp}`}>
              <IconWhatsapp />
            </a>
          )}
          {user.socialMedia.telegram && (
            <a href={`${user.socialMedia.telegram}`}>
              <IconTelegram />
            </a>
          )}
        </p>
      </div>
      <br />

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
            group={pet}
            buttonSelected={petOption}
            handleSelectButtonGroup={setPetOption}
          />
          <BaseButtonGroups
            group={gender}
            buttonSelected={genderOption}
            handleSelectButtonGroup={setGenderOption}
          />
          <BaseButtonGroups
            group={adoptionOption}
            buttonSelected={adoptionStatus}
            handleSelectButtonGroup={setAdoptionStatus}
          />
        </div>
      </div>

      <div className="my-5">
        <BaseInput
          type="text"
          value={search}
          placeholder="Search"
          label="Search by name"
          iconLeft={<IconSearch />}
          handleChange={searchFn}
        />
      </div>
      <div className="grid grid-cols-5 gap-4 max-lg:grid-cols-3 max-lg:gap-5">
        {pets.map((pet) => (
          <PetCard
            id={pet.id}
            key={pet.id}
            age={pet.age}
            name={pet.name}
            images={[pet.image]}
            gender={pet.gender}
            goToProfile={() => navigate(`/pet/${pet.id}`)}
          />
        ))}
      </div>

      <Pagination
        skip={skip}
        take={take}
        setSkip={setSkip}
        total={pets?.length}
      />
    </>
  )
}
