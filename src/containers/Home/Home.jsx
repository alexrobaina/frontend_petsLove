import React from 'react'
import { useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import OptionsSelectsStore from 'stores/OptionsSelectsStore'
import SearchPetsStore from 'stores/SearchPetsStore'
import InitialLogo from 'components/InitialLogo'
import InitialFilters from 'components/InitialFilters'
import Title from 'components/commons/Title'
import LayoutContainer from 'components/commons/LayoutContainer'
import Navbar from 'components/commons/Navbar'

const Home = () => {
  const optionsSelectsStore = useLocalStore(() => new OptionsSelectsStore())
  const searchPetsStore = useLocalStore(() => new SearchPetsStore())
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
      </LayoutContainer>
    </>
  )
}
export default Home
