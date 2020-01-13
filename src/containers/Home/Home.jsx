import React, { Fragment, useEffect } from 'react'
import anime from 'animejs/lib/anime.es'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import InitialLogo from '../../components/InitialLogo'
import InitialFormFilters from '../../components/InitialFormFilters'
import Title from '../../components/commons/Title/Title'
import styles from './home.module.scss'
import Navbar from '../../components/commons/Navbar/Navbar'

const Home = () => {
  const { t } = useTranslation('rulesCreation')
  useEffect(() => {
    anime({
      targets: '.animationOpacity',
      opacity: 1,
      easing: 'linear',
      duration: 1000,
      delay: 3500,
    })

  })

  return (
    <Fragment>
        <Navbar timeAnimation={3600} />
      <InitialLogo />
      <div className={c(styles.animationOpacity, 'animationTitle')}>
        <Title
          title={'Search for your best friend'}
          subTitle={'Do not buy a breed pet, adopt a homeless one'}
        />
      </div>
        <InitialFormFilters />
    </Fragment>
  )
}
export default Home
