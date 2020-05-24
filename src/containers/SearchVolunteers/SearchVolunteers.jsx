import React, { useCallback, useEffect, useState } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import LayoutContainer from 'components/commons/LayoutContainer'
import GoogleAutocomplete from 'components/commons/GoogleAutocomplete/GoogleAutocomplete'
import LayoutTrantitions from 'components/commons/LayoutTrantitions'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import VolunteersStore from 'stores/VolunteersStore'
import styles from './searchVolunteers.scss'

const SearchVolunteers = () => {
  const { t } = useTranslation('allSearch')
  const [stateAddress, setAddress] = useState({})
  const volunteersStore = useLocalStore(() => new VolunteersStore())

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
      <LayoutContainer
        title={t('transitSearch.title')}
        information={t('transitSearch.information')}
      >
        <div className={styles.colbig}>
          <GoogleAutocomplete
            isEdit
            label={t('transitSearch.labelGoogle')}
            placeholder={t('transitSearch.placeholderGoogle')}
            handleChangeAddress={handleChangeAddress}
          />
          {stateAddress.lat && (
            <div className={styles.containerMap}>
              <LayoutTrantitions>
                <GoogleMapsLocation
                  location={stateAddress}
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
