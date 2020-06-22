import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import CreatePetStore from 'stores/CreatePetStore'
import GoogleAutocomplete from 'components/commons/GoogleAutocomplete'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import LayoutForm from 'components/commons/LayoutForm'
import Label from 'components/commons/Label/Input'
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
      <div className={styles.subtitle}>{t('subtitleStepThree')}</div>
      <div className={styles.colMap}>
        <GoogleAutocomplete
          isEdit
          label={t('whereFound')}
          placeholder={t('addAddressPet')}
          handleChangeAddress={handleChangeAddress}
          value={createPetStore.pet.textAddress.value}
          inputStoreError={createPetStore.pet.textAddress}
          handleChangeTextAddress={handleChangeTextAddress}
        />
      </div>
      <div className={styles.colMap}>
        {createPetStore.pet.textAddress && (
          <Label text={createPetStore.pet.textAddress.value} />
        )}
        <div className={styles.containerMap}>
          <GoogleMapsLocation
            showAddress
            title={t('messageMap')}
            location={createPetStore.location}
            addressValue={createPetStore.pet.location}
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
