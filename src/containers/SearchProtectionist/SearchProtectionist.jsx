import React, { useCallback, useState } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import LayoutContainer from 'components/commons/LayoutContainer'
import GoogleAutocomplete from 'components/commons/GoogleAutocomplete/GoogleAutocomplete'
import SEO from 'components/SEO'
import ErrorMessage from 'components/commons/ErrorMessage'
import LayoutTrantitions from 'components/commons/LayoutTrantitions'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import ProtectionistStore from 'stores/ProtectionistStore'
import styles from './searchProtectionist.scss'

const SearchProtectionist = () => {
  const { t } = useTranslation('searchProtectionist')
  const [stateAddress, setAddress] = useState({})
  const protectionistStore = useLocalStore(() => new ProtectionistStore())

  const handleChangeAddress = useCallback(address => {
    setAddress(address)
  }, [])

  return (
    <div className={styles.containerTransit}>
      <SEO pageTitle={t('searchProtectionist')} />
      <LayoutContainer title={t('searchProtectionist')} information={t('information')}>
        <div className={styles.colbig}>
          <GoogleAutocomplete
            isEdit
            placeholder={t('placeholderGoogle')}
            handleChangeAddress={handleChangeAddress}
          />
          {stateAddress.lat ? (
            <LayoutTrantitions>
              <GoogleMapsLocation
                location={stateAddress}
                users={protectionistStore.protectionist}
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

export default observer(SearchProtectionist)
