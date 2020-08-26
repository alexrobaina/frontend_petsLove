import React, { useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { useInView } from 'react-intersection-observer' // 1.9K gzipped
import { motion, useAnimation } from 'framer-motion'
import LayoutLandingPage from 'components/LayoutLandingPage'
import { SEARCH_PETS, REGISTER } from 'routing/routes'
import adopter from './adopter.png'
import vet from './vet.png'
import dev from './dev.png'
import transit from './transit.png'
import styles from './containerAction.scss'

const ContainerAction = () => {
  const { t } = useTranslation('landingPage')
  const animation = useAnimation()
  const history = useHistory()
  const [ref, inView] = useInView({ threshold: 0.1 })

  const goToSearch = useCallback(() => {
    history.push(SEARCH_PETS)
  }, [])

  const goToRegister = useCallback(() => {
    history.push(REGISTER)
  }, [])

  const variantsImage = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.6,
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    hidden: {
      y: 0,
      opacity: 0,
    },
  }

  useEffect(() => {
    animation.start(variantsImage.hidden)
    if (inView) {
      animation.start(variantsImage.visible)
    }
  }, [animation, inView])

  return (
    <LayoutLandingPage>
      <motion.div
        ref={ref}
        animate={animation}
        variants={{ variantsImage }}
        initial={variantsImage.hidden}
        className={styles.title}
      >
        {t('youWantMake')}
      </motion.div>
      <motion.div
        ref={ref}
        animate={animation}
        variants={{ variantsImage }}
        initial={variantsImage.hidden}
        className={styles.container}
      >
        <motion.button
          onClick={goToSearch}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className={styles.buttonAction}
        >
          <div className={styles.containerCard}>
            <img className={styles.image} src={adopter} alt="adopter" />
            <div className={styles.subTitle}>{t('adopt')}</div>
          </div>
        </motion.button>
        <motion.button
          onClick={goToRegister}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className={styles.buttonAction}
        >
          <div className={styles.containerCard}>
            <img className={styles.image} src={transit} alt="transit" />
            <div className={styles.subTitle}>{t('manageShelter')}</div>
          </div>
        </motion.button>
        <motion.button
          onClick={goToRegister}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className={styles.buttonAction}
        >
          <div className={styles.containerCard}>
            <img className={styles.image} src={dev} alt="dev" />
            <div className={styles.subTitle}>{t('petTransit')}</div>
          </div>
        </motion.button>
        <motion.button
          onClick={goToRegister}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className={styles.buttonAction}
        >
          <div className={styles.containerCard}>
            <img className={styles.image} src={vet} alt="vet" />
            <div className={styles.subTitle}>{t('manageVeterinary')}</div>
          </div>
        </motion.button>
      </motion.div>
    </LayoutLandingPage>
  )
}

export default ContainerAction
