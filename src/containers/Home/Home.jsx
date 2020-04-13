import React, { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import Title from 'components/commons/Title'
import LayoutContainer from 'components/commons/LayoutContainer'
import LayoutTrantitions from 'components/commons/LayoutTrantitions'
import Navbar from 'components/commons/Navbar'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import GoogleAutocomplete from 'components/commons/GoogleAutocomplete/GoogleAutocomplete'
import styles from '../ProfileUser/profileUser.scss'

const Home = () => {
  const { t } = useTranslation('home')
  const [address, setAddress] = useState({})

  // eslint-disable-next-line no-shadow
  const handleChangeAddress = useCallback(address => {
    setAddress(address)
  }, [])

  const showPosition = position => {
    console.log(position.coords.latitude)
    setAddress({ lat: position.coords.latitude, lng: position.coords.longitude })
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    }
  }, [])

  return (
    <Navbar>
      <LayoutContainer>
        <Title title={t('title')} subTitle={t('subTitle')} />
        <div className={styles.colbig}>
          <GoogleAutocomplete
            isEdit
            label={t('labelGoogle')}
            placeholder="Search your address..."
            handleChangeAddress={handleChangeAddress}
          />
          {address.lat && (
            <div className={styles.containerMap}>
              <LayoutTrantitions>
                <GoogleMapsLocation location={address} />
              </LayoutTrantitions>
            </div>
          )}
        </div>
      </LayoutContainer>
    </Navbar>
  )
}
export default observer(Home)
