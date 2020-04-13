import React, { useEffect } from 'react'
import { useLocalStore, observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import PetIdStore from 'stores/PetIdStore'
import Navbar from 'components/commons/Navbar'
import LayoutContainer from 'components/commons/LayoutContainer'
import GaleryImages from 'components/commons/GaleryImages'
import ErrorMessage from 'components/commons/ErrorMessage'
import LayoutProfilePets from 'components/LayoutProfilePets'

const ProfilePets = () => {
  const { t } = useTranslation('profilePets')
  const petIdStore = useLocalStore(() => new PetIdStore())
  const { id } = useParams()

  useEffect(() => {
    petIdStore.getPetId(id)
  }, [])

  return (
    <Navbar>
      <LayoutContainer>
        <LayoutProfilePets
          name={petIdStore.pet.name}
          pet={petIdStore.pet}
          images={petIdStore.images}
          petIsEdit={petIdStore.petIsEdit}
        />
        {petIdStore.images !== [] ? (
          <GaleryImages isLoading={petIdStore.isLoading} arrayImages={petIdStore.images} />
        ) : (
          <ErrorMessage text={t('notImage')} typeMessage="warning" />
        )}
      </LayoutContainer>
    </Navbar>
  )
}

export default observer(ProfilePets)
