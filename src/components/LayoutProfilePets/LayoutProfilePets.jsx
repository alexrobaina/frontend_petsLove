import React from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Title from 'components/commons/Title'
import ImageProfilePet from 'components/ImageProfilePet'
import InformationPet from 'components/InformationPet'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import PetIdStore from 'stores/PetIdStore'
import MedicalInformationDog from 'components/MedicalInformationDog'
import ButtonShare from 'components/commons/ButtonShare'
import MedicalInformationCat from 'components/MedicalInformationCat'
import TextCard from 'components/commons/TextCard'
import styles from './layoutProfilePets.scss'

const LayoutProfilePets = ({ store }) => {
  const { t } = useTranslation('profilePets')

  const { getCategory, getHistory, getName, images, foundLocation, textAddress } = store.pet

  const { phone } = store
  console.log(store.pet.medicalInformationDog.notes.value)
  return (
    <>
      <div className={styles.header}>
        <Title title={t('title', { getName })} />
        <ButtonShare canEdit route="edit-pet" phone={phone} />
      </div>
      <div className={styles.colums}>
        <ImageProfilePet images={images} />
        <GoogleMapsLocation
          isProfilePet
          location={foundLocation.value}
          petLocation={textAddress.value}
        />
      </div>
      <div className={styles.colums}>
        <InformationPet title={t('common:basicInformation')} pet={store.pet} />
        {getCategory === 'dog' && (
          <>
            <MedicalInformationDog title={t('common:medicalInformation')} pet={store.pet} />
          </>
        )}
        {store.pet.category.value === 'cat' && (
          <>
            <MedicalInformationCat title={t('common:medicalInformation')} pet={store.pet} />
          </>
        )}
      </div>
      {getHistory && <TextCard title={t('history')} text={getHistory} />}
      {store.pet.medicalInformationDog.notes.value && (
        <TextCard title={t('common:notes')} text={store.pet.medicalInformationDog.notes.value} />
      )}
      {store.pet.medicalInformationCat.notes.value && (
        <TextCard title={t('common:notes')} text={store.pet.medicalInformationCat.notes.value} />
      )}
    </>
  )
}

LayoutProfilePets.propTypes = {
  store: PropTypes.instanceOf(PetIdStore).isRequired,
}

export default observer(LayoutProfilePets)
