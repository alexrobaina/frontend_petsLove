import React, { useEffect } from 'react'
import anime from 'animejs/lib/anime.es'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import InitialLogo from 'components/InitialLogo'
import InitialFormFilters from 'components/InitialFormFilters'
import Title from 'components/commons/Title'
import LayoutContainer from 'components/commons/LayoutContainer'
import Navbar from 'components/commons/Navbar'
import styles from './home.scss'

const Home = () => {
  const { t } = useTranslation('rulesCreation')

  return (
    <>
      <Navbar className={styles.fixedNavbar} timeAnimation={3200} />
      <LayoutContainer>
        <InitialLogo />
          <Title
            timeAnimation={3600}
            title={'Search for your best friend'}
            subTitle={'Do not buy a breed pet, adopt a homeless one'}
          />
        <InitialFormFilters />
      </LayoutContainer>
    </>
  )
}
export default Home
