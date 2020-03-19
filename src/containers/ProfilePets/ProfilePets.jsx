import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocalStore, observer } from 'mobx-react'
import c from 'classnames'
import { useParams } from 'react-router'
import PetIdStore from 'stores/PetIdStore'
import ContactProtectionistEmailStore from 'stores/ContactProtectionistEmailStore'
import OptionsSelectsStore from 'stores/OptionsSelectsStore'
import SearchPetsStore from 'stores/SearchPetsStore'
import Navbar from 'components/commons/Navbar'
import LayoutContainer from 'components/commons/LayoutContainer'
import PlaceMarkMap from 'components/commons/PlaceMarkMap'
import Title from 'components/commons/Title'
import Footer from 'components/commons/Footer/Footer'
import GaleryImages from 'components/commons/GaleryImages'
import InformationPet from 'components/InformationPet'
import ListPets from 'components/ListPets'
import ErrorMessage from 'components/commons/ErrorMessage'
import ImageProfilePet from 'components/ImageProfilePet'
import TextCard from 'components/commons/TextCard'
import { useTranslation } from 'react-i18next'
import ButtonsPet from './ButtonsPet'
import styles from './profilePets.scss'

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
  console.log(images)
  return (
    <>
      <Navbar optionsSelectsStore={optionsSelectsStore} searchPetsStore={searchPetsStore} />
      {!searchPetsStore.pets ? (
        <LayoutContainer>
          <div className={styles.name}>
            <Title mTop="120px" title={`My name is ${name}`} />
            <ButtonsPet
              petIdStore={petIdStore}
              contactProtectionistEmailStore={contactProtectionistEmailStore}
              isEdit={isEdit}
            />
          </div>
          <div className={c(styles.containerCard, styles.layourCard)}>
            <ImageProfilePet petIdStore={petIdStore} />
            <PlaceMarkMap
              defaultPosition={petIdStore.defaultPosition}
              mapPosition={petIdStore.mapPosition}
              contactMessage={`You can call for adopt to ${petIdStore.pet.name} phone: ${
                petIdStore.pet.phone ? petIdStore.pet.phone : ''
              }`}
            />
            <InformationPet petIdStore={petIdStore} />
            <div>
              <TextCard title="History" text={petIdStore.pet.history} />
              <TextCard title="Required to Adoption" text={petIdStore.pet.requiredToAdoption} />
            </div>
          </div>
          {images !== [] ? (
            <GaleryImages isLoading={isLoading} arrayImages={images} />
          ) : (
            <ErrorMessage text="This pet has no images" typeMessage="warning" />
          )}
        </LayoutContainer>
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
