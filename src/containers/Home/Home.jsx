import React, { useCallback, useEffect, useState } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import Title from 'components/commons/Title'
import ProtectionistStore from 'stores/ProtectionistStore'
import LayoutContainer from 'components/commons/LayoutContainer'
import LayoutTrantitions from 'components/commons/LayoutTrantitions'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import GoogleAutocomplete from 'components/commons/GoogleAutocomplete/GoogleAutocomplete'
import styles from './home.scss'

const Home = () => {
  const { t } = useTranslation('home')
  const [address, setAddress] = useState({})
  const protectionistStore = useLocalStore(() => new ProtectionistStore())

  // eslint-disable-next-line no-shadow
  const handleChangeAddress = useCallback(address => {
    setAddress(address)
  }, [])

  const showPosition = position => {
    setAddress({ lat: position.coords.latitude, lng: position.coords.longitude })
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    }

    protectionistStore.searchProtectionists()
  }, [])

  return (
    <LayoutContainer>
      <Title title={t('title')} subTitle={t('subTitle')} />
      <div className={styles.colbig}>
        <GoogleAutocomplete
          isEdit
          label={t('labelGoogle')}
          placeholder={t('placeholderGoogle')}
          handleChangeAddress={handleChangeAddress}
        />
        {address.lat && (
          <div className={styles.containerMap}>
            <LayoutTrantitions>
              <GoogleMapsLocation
                location={address}
                users={protectionistStore.protectionists}
                arrayLocation={protectionistStore.arrayLocationProtectionists}
              />
            </LayoutTrantitions>
          </div>
        )}
        
      </div>
    </LayoutContainer>
  )
}
export default observer(Home)
