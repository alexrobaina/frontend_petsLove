import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import InitialLogo from 'components/InitialLogo'
import InitialFilters from 'components/InitialFilters'
import Title from 'components/commons/Title'
import Navbar from 'components/commons/Navbar'
import LayoutContainer from 'components/commons/LayoutContainer'
import ErrorMessage from 'components/commons/ErrorMessage'
import UserContext from '../../Context/UserContext'

const Home = () => {
  const rootStore = useContext(UserContext)
  const { optionsSelectsStore, searchPetsStore } = rootStore
  const { t } = useTranslation()

  return (
    <>
      <Navbar optionsSelectsStore={optionsSelectsStore} searchPetsStore={searchPetsStore} />
      <LayoutContainer>
        <InitialLogo />
        <Title timeAnimation={3600} title={t('home.title')} subTitle={t('home.subTitle')} />
        <InitialFilters
          optionsSelectsStore={optionsSelectsStore}
          searchPetsStore={searchPetsStore}
        />
        {searchPetsStore.isError && (
          <ErrorMessage text={t('common.errorMessage')} typeMessage="warning" />
        )}
      </LayoutContainer>
    </>
  )
}
export default Home
