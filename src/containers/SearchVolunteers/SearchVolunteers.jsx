import React, { useCallback, useState } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import LayoutContainer from 'components/commons/LayoutContainer'
import GoogleAutocomplete from 'components/commons/GoogleAutocomplete/GoogleAutocomplete'
import SEO from 'components/SEO'
import ErrorMessage from 'components/commons/ErrorMessage'
import LayoutTrantitions from 'components/commons/LayoutTrantitions'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import SearchVolunteersStore from 'stores/SearchVolunteersStore'
import styles from './searchVolunteers.scss'

const SearchVolunteers = () => {
  const { t } = useTranslation('searchVolunteers')
  const [stateAddress, setAddress] = useState({})
  const searchVolunteersStore = useLocalStore(() => new SearchVolunteersStore())

  const handleChangeAddress = useCallback(address => {
    setAddress(address)
  }, [])

  return (
    <div className={styles.containerTransit}>
      <SEO pageTitle={t('searchVolunteers')} />
      <LayoutContainer title={t('searchVolunteers')} information={t('information')}>
        <div className={styles.colbig}>
          <GoogleAutocomplete
            isEdit
            label={t('labelGoogle')}
            placeholder={t('placeholderGoogle')}
            handleChangeAddress={handleChangeAddress}
          />
          {stateAddress.lat ? (
            <LayoutTrantitions>
              <GoogleMapsLocation
                location={stateAddress}
                users={searchVolunteersStore.volunteers}
              />
            </LayoutTrantitions>
          ) : (
            <ErrorMessage text={t('common:addLocation')} typeMessage="warning" />
          )}
        </div>
      </LayoutContainer>
    </div>
  )
}

export default observer(SearchVolunteers)
