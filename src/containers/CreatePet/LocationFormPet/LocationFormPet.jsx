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

  const { textAddress, getFoundLocation, location, getTextAddress } = createPetStore.pet

  return (
    <LayoutForm>
      <div className={styles.subtitle}>{t('subtitleStepThree')}</div>
      <div className={styles.colMap}>
        <GoogleAutocomplete
          isEdit
          label={t('whereFound')}
          value={getFoundLocation}
          placeholder={t('addAddressPet')}
          inputStoreError={textAddress}
          handleChangeAddress={handleChangeAddress}
          handleChangeTextAddress={handleChangeTextAddress}
        />
      </div>
      <div className={styles.colMap}>
        {textAddress && <Label text={getTextAddress} />}
        <div className={styles.containerMap}>
          <GoogleMapsLocation
            showAddress
            location={location.value}
            title={t('messageMap')}
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
