import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer' // 1.9K gzipped
import { motion, useAnimation } from 'framer-motion'
import Button from 'components/commons/Button'
import boyAndDog from '../boyAndDog.jpg'
import styles from './firstSection.scss'

const FirstSection = () => {
  const animation = useAnimation()
  const animationImage = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1 })

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
        delay: 1,
        duration: 0.5,
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
      animationImage.start(variantsImage.visible)
    }
  }, [animation, inView])

  return (
    <div className={styles.containerSection}>
      <div className={styles.containerInformation}>
        <motion.div ref={ref} animate={animation} variants={{ variants }} initial={variants.hidden}>
          <div className={styles.title}>
            PetsLove es una web app para administrar
            <span className={styles.titleSpan}>refugios y veterinarias.</span>
          </div>

          <div className={styles.textInformation}>
            Buscamos crear una comunidad de personas que aman a los animales y para contactar a
            refugios con personas que adoptan y veterinarios que trabajan por el bienestar de
            nuestros grandes compañeros.
          </div>
          <div className={styles.containerButtonRegister}>
            <Button bigButton text="Quiero registrarme" />
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
  )
}

export default FirstSection
