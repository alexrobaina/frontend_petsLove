import React, { useEffect } from 'react'
import { useLocalStore, observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import PetIdStore from 'stores/PetIdStore'
import Navbar from 'components/commons/Navbar'
import LayoutContainer from 'components/commons/LayoutContainer'
import Footer from 'components/commons/Footer/Footer'
import GaleryImages from 'components/commons/GaleryImages'
import ErrorMessage from 'components/commons/ErrorMessage'
import LayoutProfilePets from 'components/LayoutProfilePets'

const ProfilePets = () => {
  const petIdStore = useLocalStore(() => new PetIdStore())
  const { id } = useParams()
  const { t } = useTranslation()

  useEffect(() => {
    petIdStore.getPetId(id)
  }, [])

  return (
    <Navbar>
      <LayoutContainer>
        <LayoutProfilePets
          name={petIdStore.pet.name}
          petIsEdit={petIdStore.petIsEdit}
          petIdStore={petIdStore}
        />
        {petIdStore.images !== [] ? (
          <GaleryImages isLoading={petIdStore.isLoading} arrayImages={petIdStore.images} />
        ) : (
          <ErrorMessage text={t('profilePets.notImage')} typeMessage="warning" />
        )}
      </LayoutContainer>
      <Footer />
    </Navbar>
  )
}

export default observer(ProfilePets)
