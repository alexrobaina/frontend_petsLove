import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import CreatePetStore from 'stores/CreatePetStore'
import GoogleAutocomplete from 'components/commons/GoogleAutocomplete'
import Label from 'components/commons/Label'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import LayoutForm from 'components/commons/LayoutForm'
import styles from './locationFormPet.scss'

const LocationFormPet = ({ createPetStore }) => {
  const { t } = useTranslation('createPet')

  const handleChangeAddress = useCallback(address => {
    createPetStore.pet.setFoundLocation(address)
    createPetStore.pet.setLocation(address)
  }, [])

  const handleChangeTextAddress = useCallback(address => {
    createPetStore.pet.setTextAddress(address)
  }, [])

  const handleChangeAddressComponents = useCallback(location => {
    createPetStore.pet.setCity(location)
    createPetStore.pet.setCountry(location)
  }, [])

  const { textAddress, getFoundLocation, location, getTextAddress } = createPetStore.pet

  return (
    <LayoutForm>
      <div className={styles.subtitle}>{t('locationTitle')}</div>
      <div className={styles.colMap}>
        <GoogleAutocomplete
          isEdit
          value={getFoundLocation}
          inputStoreError={textAddress}
          label={t('labelWhereFoundPet')}
          handleChangeAddress={handleChangeAddress}
          placeholder={t('placeHolderGoogleAutoComplete')}
          handleChangeTextAddress={handleChangeTextAddress}
          handleChangeAddressComponents={handleChangeAddressComponents}
        />
      </div>
      <div className={styles.colMap}>
        {textAddress && <Label text={getTextAddress} />}
        <div className={styles.containerMap}>
          <GoogleMapsLocation
            showAddress
            title={t('messageMap')}
            location={location.value}
            addressValue={location.value}
          />
        </div>
      </div>
    </LayoutForm>
  )
}

LocationFormPet.propTypes = {
  createPetStore: PropTypes.instanceOf(CreatePetStore).isRequired,
}

export default observer(LocationFormPet)
