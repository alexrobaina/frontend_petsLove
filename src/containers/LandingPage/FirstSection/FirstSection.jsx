import React, { useEffect, useCallback, useContext } from 'react'
import { RiMouseLine } from 'react-icons/ri'
import { useInView } from 'react-intersection-observer' // 1.9K gzipped
import { motion, useAnimation } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { PROFILE_USER, REGISTER } from 'routing/routes'
import Button from 'components/commons/Button'
import UserContext from 'Context/UserContext'
import LayoutLandingPage from 'components/LayoutLandingPage'
import boyAndDog from '../boyAndDog.jpg'
import styles from './firstSection.scss'

const FirstSection = () => {
  const history = useHistory()
  const { t } = useTranslation('landingPage')
  const animation = useAnimation()
  const animationImage = useAnimation()
  const animationButtonDown = useAnimation()
  const [ref] = useInView({ threshold: 0.1 })
  const { authStore } = useContext(UserContext);

  const goTo = useCallback(() => {
    if (authStore.isLogin) return history.push(`${PROFILE_USER}/${authStore.user._id}`)
    return history.push(REGISTER)
  }, [authStore.isLogin])

  const formatText = useCallback(() => {
    if (authStore.isLogin) return t('navbar:myProfile')
    return t('common:signUp')
  }, [authStore.isLogin])

  const variants = {
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

  const buttonDown = {
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
      y: 100,
    },
  }

  useEffect(() => {
    animation.start(variants.visible)
    animationImage.start(variantsImage.visible)
    animationButtonDown.start(buttonDown.visible)
  }, [animation])

  return (
    <LayoutLandingPage>
      <div className={styles.containerSection}>
        <div className={styles.containerInformation}>
          <motion.div animate={animation} variants={{ variants }} initial={variants.hidden}>
            <div className={styles.title}>
              {t('findAPet')}
              <span className={styles.titleSpan}>{t('spanFindAPet')}</span>
            </div>

            <div className={styles.textInformation}>{t('textFindAPet')}</div>
            <div className={styles.containerButtonSignUp}>
              <Button handleClick={goTo} bigButton text={formatText()} />
            </div>
          </motion.div>
        </div>
        <motion.div
          ref={ref}
          animate={animationImage}
          variants={{ variantsImage }}
          initial={variantsImage.hidden}
        >
          <div className={styles.containerIlustration}>
            <img className={styles.boyAndDog} src={boyAndDog} alt="boyAndDog" />
          </div>
        </motion.div>
      </div>
      <div className={styles.buttonDown}>
        <motion.div
          transition={{
            y: { duration: 0.5, yoyo: Infinity, ease: 'easeOut' },
            backgroundColor: { duration: 0, yoyo: Infinity, ease: 'easeOut', repeatDelay: 0.8 },
          }}
          animate={{ y: ['30%', '-30%'] }}
        >
          <RiMouseLine size={25} />
        </motion.div>
      </div>
    </LayoutLandingPage>
  )
}

export default FirstSection
