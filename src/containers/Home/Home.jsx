import React, { Fragment, useEffect } from 'react'
import anime from 'animejs/lib/anime.es'
import c from 'classnames'
import InitialFormFilters from '../../components/InitialFormFilters'
import Title from '../../components/commons/Title/Title'
import styles from './home.module.scss'

const Home = () => {
  useEffect(() => {
    setTimeout(() => {
      anime({
        targets: '.animationOpasity',
        opacity: 1,
        easing: 'linear',
        duration: 1000,
      })
    }, 0)
  })

  return (
    <Fragment>
      {/* <InitialLogo /> */}
      <div className={c(styles.animationOpasity, 'animationOpasity')}>
        <Title title={`Adopt don't buy`} subTitle={'Do not buy a breed bog, buy a homeless one'} />
        <InitialFormFilters />
      </div>
    </Fragment>
  )
}
export default Home
