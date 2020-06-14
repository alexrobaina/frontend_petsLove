import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import CreatePetStore from 'stores/CreatePetStore'
import GoogleAutocomplete from 'components/commons/GoogleAutocomplete'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import LayoutForm from 'components/commons/LayoutForm'
import styles from './locationFormPet.scss'

const LocationFormPet = ({ createPetStore }) => {
  const { t } = useTranslation('createPet')

  const handleChangeAddress = useCallback(address => {
    createPetStore.setAddress(address)
  }, [])

  const handleChangeTextAddress = useCallback(address => {
    createPetStore.setTextAddress(address)
  }, [])

  return (
    <LayoutForm>
      <div className={styles.subtitle}>{t('Locations of the pet')}</div>
      <div className={styles.colMap}>
        <GoogleAutocomplete
          label={t('Where was it found?')}
          isEdit={createPetStore.isEdit}
          placeholder={t('Add location...')}
          value={createPetStore.pet.textAddress.value}
          handleChangeAddress={handleChangeAddress}
          inputStoreError={createPetStore.pet.textAddress}
          handleChangeTextAddress={handleChangeTextAddress}
        />
      </div>
      <div className={styles.colMap}>
        <div className={styles.containerMap}>
          <GoogleMapsLocation
            showAddress
            title={t('messageMap')}
            location={createPetStore.location}
            addressValue={{
              lat: createPetStore.pet.lat.value,
              lng: createPetStore.pet.lng.value,
            }}
          />
        </div>
      </div>
    </LayoutForm>
  )
}

LocationFormPet.propTypes = {
  createPetStore: PropTypes.instanceOf(CreatePetStore).isRequired,
}

export default LocationFormPet
