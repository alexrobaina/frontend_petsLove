import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocalStore, observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import PetIdStore from 'stores/PetIdStore'
import LayoutContainer from 'components/commons/LayoutContainer'
import GaleryImages from 'components/commons/GaleryImages'
import ErrorMessage from 'components/commons/ErrorMessage'
import LayoutProfilePets from 'components/LayoutProfilePets'

const ProfilePets = () => {
  const petIdStore = useLocalStore(() => new PetIdStore())
  const { phone, email, name } = petIdStore.pet
  const { t } = useTranslation('profilePets')
  const { id } = useParams()

  useEffect(() => {
    petIdStore.getPetId(id)
  }, [])

  return (
    <LayoutContainer>
      <Link to={`/profile-user/${petIdStore.idUser}`}>{t('linkBack')}</Link>
      <LayoutProfilePets
        name={petIdStore.pet.name}
        email={email}
        phone={phone}
        pet={petIdStore.pet}
        images={petIdStore.images}
        userCreatorExist={petIdStore.idUser}
        userAdopt={petIdStore.pet.userAdopter}
      />
      {petIdStore.images !== [] ? (
        <GaleryImages isLoading={petIdStore.isLoading} arrayImages={petIdStore.images} />
      ) : (
        <ErrorMessage text={t('notImage')} typeMessage="warning" />
      )}
    </LayoutContainer>
  )
}

export default observer(ProfilePets)
