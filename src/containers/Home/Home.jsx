import React from 'react'
import { useTranslation } from 'react-i18next'
import InitialLogo from 'components/InitialLogo'
import SearchPetsStore from '../../stores/SearchPetsStore'
import InitialFilters from 'components/InitialFilters'
import Title from 'components/commons/Title'
import LayoutContainer from 'components/commons/LayoutContainer'
import Navbar from 'components/commons/Navbar'
import styles from './home.scss'
import { useLocalStore } from 'mobx-react'

const Home = () => {
  const searchPetsStore = useLocalStore(() => new SearchPetsStore())
  const { t } = useTranslation('rulesCreation')
  return (
    <>
      <Navbar searchPetsStore={searchPetsStore} className={styles.fixedNavbar} timeAnimation={3200}/>
      <LayoutContainer>
        <InitialLogo/>
        <Title
          timeAnimation={3600}
          title={'Search for your best friend'}
          subTitle={'Do not buy a breed pet, adopt a homeless one'}
        />
        <InitialFilters searchPetsStore={searchPetsStore}/>
      </LayoutContainer>
    </>
  )
}
export default Home
