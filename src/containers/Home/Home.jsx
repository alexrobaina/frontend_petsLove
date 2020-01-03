import React, { Fragment, useEffect } from 'react'
import anime from 'animejs/lib/anime.es'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import InitialLogo from '../../components/InitialLogo'
import InitialFormFilters from '../../components/InitialFormFilters'
import Title from '../../components/commons/Title/Title'
import styles from './home.module.scss'
import ListPets from '../../components/ListPets'

const Home = () => {
  const { t } = useTranslation('rulesCreation')
  useEffect(() => {
    setTimeout(() => {
      anime({
        targets: '.animationOpasity',
        opacity: 1,
        easing: 'linear',
        duration: 1000,
      })
    }, 3500)
  })

  return (
    <Fragment>
      <InitialLogo />
      <div className={c(styles.animationOpasity, 'animationOpasity')}>
        <Title
          title={'Search for your best friend'}
          subTitle={'Do not buy a breed pet, buy a homeless one'}
        />
        <InitialFormFilters />
      </div>
    </Fragment>
  )
}
export default Home
