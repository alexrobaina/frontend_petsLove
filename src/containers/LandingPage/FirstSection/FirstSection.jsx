import React, { useEffect, useCallback } from 'react'
import { useInView } from 'react-intersection-observer' // 1.9K gzipped
import { motion, useAnimation } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { REGISTER } from 'routing/routes'
import Button from 'components/commons/Button'
import LayoutLandingPage from 'components/LayoutLandingPage'
import boyAndDog from '../boyAndDog.jpg'
import styles from './firstSection.scss'

const FirstSection = () => {
  const history = useHistory()
  const { t } = useTranslation('landingPage')
  const animation = useAnimation()
  const animationImage = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1 })

  const gotToRegister = useCallback(() => {
    history.push(REGISTER)
  }, [])

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

  useEffect(() => {
    if (inView) {
      animation.start(variants.visible)
      animationImage.start(variantsImage.visible)
    } else {
      animation.start(variants.hidden)
      animationImage.start(variantsImage.hidden)
    }
  }, [animation, inView])

  return (
    <LayoutLandingPage>
      <div className={styles.containerSection}>
        <div className={styles.containerInformation}>
          <motion.div
            ref={ref}
            animate={animation}
            variants={{ variants }}
            initial={variants.hidden}
          >
            <div className={styles.title}>
              {t('findAPet')}
              <span className={styles.titleSpan}>{t('spanFindAPet')}</span>
            </div>

            <div className={styles.textInformation}>{t('textFindAPet')}</div>
            <div className={styles.containerButtonRegister}>
              <Button handleClick={gotToRegister} bigButton text={t('wantRegister')} />
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
    </LayoutLandingPage>
  )
}

export default FirstSection
