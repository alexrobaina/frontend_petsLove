import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocalStore, observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import PetIdStore from 'stores/PetIdStore'
import ContactProtectionistEmailStore from 'stores/ContactProtectionistEmailStore'
import OptionsSelectsStore from 'stores/OptionsSelectsStore'
import SearchPetsStore from 'stores/SearchPetsStore'
import Navbar from 'components/commons/Navbar'
import LayoutContainer from 'components/commons/LayoutContainer'
import Footer from 'components/commons/Footer/Footer'
import GaleryImages from 'components/commons/GaleryImages'
import ListPets from 'components/ListPets'
import ErrorMessage from 'components/commons/ErrorMessage'
import Modal from 'components/commons/Modal/Modal'
import LayoutProfilePets from 'components/LayoutProfilePets'
import Loading from '../../components/commons/Loading/Loading'

const ProfilePets = ({ isEdit }) => {
  const contactProtectionistEmailStore = useLocalStore(() => new ContactProtectionistEmailStore())
  const optionsSelectsStore = useLocalStore(() => new OptionsSelectsStore())
  const searchPetsStore = useLocalStore(() => new SearchPetsStore())
  const petIdStore = useLocalStore(() => new PetIdStore())
  const { id } = useParams()
  const { t } = useTranslation()

  useEffect(() => {
    petIdStore.getPetId(id)
  }, [])

  const { name } = petIdStore.pet
  const { isLoading, images } = petIdStore

  const deleteFilter = useCallback((selectedValue, typeFilter) => {
    searchPetsStore.deleteFilter(selectedValue, typeFilter)
  })

  const { isError, isSuccess } = contactProtectionistEmailStore

  return (
    <>
      {isError && (
        <Modal error text={t('profilePets.sendEmailError')} title={t('profilePets.titleError')} />
      )}
      {isSuccess && (
        <Modal text={t('profilePets.sendEmailSuccess')} title={t('profilePets.titleSuccess')} />
      )}
      <Navbar optionsSelectsStore={optionsSelectsStore} searchPetsStore={searchPetsStore} />
      {/* eslint-disable-next-line no-nested-ternary */}
      {!searchPetsStore.pets ? (
        <LayoutContainer>
          <LayoutProfilePets
            name={name}
            isEdit={isEdit}
            petIdStore={petIdStore}
            contactProtectionistEmailStore={contactProtectionistEmailStore}
          />
          {images !== [] ? (
            <GaleryImages isLoading={isLoading} arrayImages={images} />
          ) : (
            <ErrorMessage text="This pet has no images" typeMessage="warning" />
          )}
        </LayoutContainer>
      ) : searchPetsStore.isLoading ? (
        <Loading />
      ) : (
        <ListPets
          handleDelete={deleteFilter}
          filters={searchPetsStore.filters}
          pets={searchPetsStore.pets}
          isLoading={searchPetsStore.isLoading}
          isError={searchPetsStore.isError}
        />
      )}
      {searchPetsStore.isError && (
        <ErrorMessage text={t('common.errorMessage')} typeMessage="warning" />
      )}
      <Footer />
    </>
  )
}

ProfilePets.propTypes = {
  isEdit: PropTypes.bool,
}

ProfilePets.defaultProps = {
  isEdit: true,
}

export default observer(ProfilePets)
