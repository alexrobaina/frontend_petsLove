import React, { useCallback, useState } from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
// import InitialFilters from 'components/InitialFilters'
// import UserContext from 'Context/UserContext'
import Title from 'components/commons/Title'
import LayoutContainer from 'components/commons/LayoutContainer'
import Navbar from 'components/commons/Navbar'
import GoogleAutocomplete from '../../components/commons/GoogleAutocomplete/GoogleAutocomplete'
import styles from '../ProfileUser/profileUser.scss'
import GoogleMapsLocation from '../../components/commons/GoogleMapsLocation'

const Home = () => {
  // const rootStore = useContext(UserContext)
  // const { optionsSelectsStore, searchPetsStore } = rootStore
  const { t } = useTranslation()
  const [address, setAddress] = useState({})
  const [textAddress, setTextAddress] = useState({})

  const handleChangeLocation = useCallback(location => {
    setAddress(location)
  }, [])

  const handleChangeAddress = useCallback(address => {
    setTextAddress(address)
  }, [])

  return (
    <Navbar>
      <LayoutContainer>
        <Title title={t('home.title')} subTitle={t('home.subTitle')} />
        <div className={styles.colbig}>
          <GoogleAutocomplete
            handleChangeAddress={handleChangeAddress}
            handleChangeLocation={handleChangeLocation}
            isEdit
            // value={editUserStore.user.textAddress}
            label="Your Address"
            placeholder="Search your address..."
          />
          {address.lat && (
            <div className={styles.containerMap}>
              <GoogleMapsLocation
                showAddress
                location={address}
                title={t('createPet.messageMap')}
              />
            </div>
          )}
        </div>
        {/*<InitialFilters*/}
        {/*  optionsSelectsStore={optionsSelectsStore}*/}
        {/*  searchPetsStore={searchPetsStore}*/}
        {/*/>*/}
      </LayoutContainer>
    </Navbar>
  )
}
export default observer(Home)
