import React, { useCallback, useEffect, useState } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import LayoutContainer from 'components/commons/LayoutContainer'
import GoogleAutocomplete from 'components/commons/GoogleAutocomplete/GoogleAutocomplete'
import LayoutTrantitions from 'components/commons/LayoutTrantitions'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import VolunteersStore from 'stores/VolunteersStore'
import Title from 'components/commons/Title'
import styles from './searchVolunteers.scss'

const SearchVolunteers = () => {
  const { t } = useTranslation()
  const [address, setAddress] = useState({})
  const volunteersStore = useLocalStore(() => new VolunteersStore())

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

    volunteersStore.searchVolunteers()
  }, [])

  return (
    <div className={styles.containerTransit}>
      <LayoutContainer title="Search volunteers">
        <Title subTitle={t('People help pets need trantist')} />
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
                <GoogleMapsLocation
                  location={address}
                  users={volunteersStore.volunteers}
                  arrayLocation={volunteersStore.arrayLocationVolunteers}
                />
              </LayoutTrantitions>
            </div>
          )}
        </div>
      </LayoutContainer>
    </div>
  )
}

export default observer(SearchVolunteers)
