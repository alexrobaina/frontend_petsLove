import { type FC, useState, useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import { MidDog } from '../../../../assets/images'
import { BaseLoading } from '../../../../components/common/BaseLoading'
import { Header } from '../../../../components/common/Header'
import { Pagination } from '../../../../components/common/Pagination'
import { PetList } from '../../../../components/common/PetList/Index'
import { SocialMediaContact } from '../../../../components/common/SocialMediaContact'
import { useUserPets } from '../../../../hooks/user/useUserPets'
import { AppContext } from '../../../../services/AppContext'
import UserPetFilters from '../UserPetFilters'

type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  image: string
  description: string
  role: string
  username: string
  location: {
    city: string
    country: string
  }
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

const h2Class = 'text-lg md:text-lg font-semibold'

export const UserProfile: FC<Props> = ({ user }) => {
  const context = useContext(AppContext)
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

  const isGoogleAvatar =
    user?.image && user?.image?.includes('googleusercontent' || 'ggpht')

  const showImage = isGoogleAvatar
    ? user?.image
    : `${import.meta.env.VITE_BUCKET_NAME}users/avatar/${user?.image}`

  if (
    (user?.id !== context?.user?.id && user?.role === 'VET') ||
    user?.role === 'ADOPTER'
  ) {
    return (
      <>
        <Helmet>
          <title>{user?.username} - Pet Profile</title>
          <meta name="description" content={user?.description} />
          {user?.image && (
            <meta
              property="og:image"
              content={`${import.meta.env.VITE_BUCKET_NAME}pets/${user?.image}`}
            />
          )}
          <meta property="og:title" content={user?.username} />
          <meta property="og:description" content={user?.description} />
        </Helmet>
        <div className="flex justify-between flex-col sm:flex-row mb-6">
          <header className="flex gap-5">
            <Header buttonBack />
          </header>
        </div>
        <div className="py-6 px-6 pb-2 items-center gap-3 mt-5 sm:mt-0 w-full rounded-2xl bg-primary-100">
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 max-sm:h-[58px] max-sm:w-[58px] rounded-full">
              <img
                onError={handleError}
                className="rounded-full object-cover h-full w-full"
                src={showImage}
              />
            </div>
            <div className=" px-2 text-xl font-medium  py-1 rounded-2xl">
              {`${t(`common:${user?.role}`)} ${getName()}`}
            </div>
          </div>
          <div className="flex gap-20 mt-6">
            {user?.location && (
              <div className="my-2">
                <h2 className={h2Class}>{t('common:location')}</h2>
                <div className="flex py-2 items-center">
                  <p>
                    {user.location.city}, {user.location.country}
                  </p>
                </div>
              </div>
            )}
            <div className="my-2">
              <h2 className={h2Class}>{t('common:contact')}</h2>
              <div className="flex py-2 items-center">
                <SocialMediaContact user={user} />
              </div>
            </div>
          </div>
        </div>
        {user?.description && (
          <div className="my-2 mt-6">
            <h2 className={h2Class}>{t('aboutUs')}</h2>
            <p className="my-2">{user?.description}</p>
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <div className="flex justify-between flex-col sm:flex-row mb-6">
        <header className="flex gap-5">
          <Header buttonBack />
        </header>
      </div>
      <div className="py-6 px-6 pb-2 items-center gap-3 mt-5 sm:mt-0 w-full rounded-2xl bg-primary-100">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 max-sm:h-[58px] max-sm:w-[58px] rounded-full">
            <img
              onError={handleError}
              className="rounded-full object-cover h-full w-full"
              src={showImage}
            />
          </div>
          <div className=" px-2 text-xl font-medium  py-1 rounded-2xl">
            {`${t(`common:${user?.role}`)} ${getName()}`}
          </div>
        </div>
        <div className="flex md:gap-20 mt-6 flex-col md:flex-row gap-2">
          {user?.location && (
            <div className="my-2">
              <h2 className={h2Class}>{t('common:location')}</h2>
              <div className="flex py-2 items-center">
                <p>
                  {user.location.city}, {user.location.country}
                </p>
              </div>
            </div>
          )}
          <div className="my-2">
            <h2 className={h2Class}>{t('common:contact')}</h2>
            <div className="flex py-2 items-center">
              <SocialMediaContact user={user} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-16"></div>
      {user?.description && (
        <div className="my-2 mt-6">
          <h2 className={h2Class}>{t('aboutUs')}</h2>
          <p className="my-2">{user?.description}</p>
        </div>
      )}
      <UserPetFilters
        gender={gender}
        category={category}
        isAdopted={isAdopted}
        resetFiler={resetFiler}
        setPetOption={setPetOption}
        searchByName={searchByName}
        setSearchByName={setSearchByName}
        setGenderOption={setGenderOption}
        setAdoptionStatus={setAdoptionStatus}
      />
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
