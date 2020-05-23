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
  const { phone, email } = petIdStore
  const { t } = useTranslation('profilePets')
  const { id } = useParams()

  useEffect(() => {
    petIdStore.getPetId(id)
  }, [])

  return (
    <LayoutContainer>
      <Link to={`/profile-user/${petIdStore.idUser}`}>{t('linkBack')}</Link>
      <LayoutProfilePets
        email={email}
        phone={phone}
        name={petIdStore.pet.name}
        pet={petIdStore.pet}
        userAdopt={petIdStore.pet.userAdopt}
        images={petIdStore.images}
        petIsEdit={petIdStore.petIsEdit}
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
