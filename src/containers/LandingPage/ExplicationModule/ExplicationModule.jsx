import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { useInView } from 'react-intersection-observer' // 1.9K gzipped
import { motion, useAnimation } from 'framer-motion'
import LayoutLandingPage from 'components/LayoutLandingPage'
import styles from './explicationModule.scss'

const ExplicationModule = ({ title, text, image, mirror }) => {
  const animation = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1 })

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
  }, [])

  useEffect(() => {
    if (inView) {
      animation.start(variantsImage.visible)
    }
  }, [animation, inView])

  return (
    <LayoutLandingPage>
      <div className={styles.container}>
        <motion.div
          ref={ref}
          animate={animation}
          variants={{ variantsImage }}
          initial={variantsImage.hidden}
          className={c(styles.containerInformation, mirror && styles.mirror)}
        >
          <div className={styles.title}>{title}</div>
          <div className={styles.text}>{text}</div>
        </motion.div>
        <motion.div
          ref={ref}
          animate={animation}
          variants={{ variantsImage }}
          initial={variantsImage.hidden}
          className={c(styles.containerImage, mirror && styles.mirror)}
        >
          <img className={styles.image} src={image} alt="adopter" />
        </motion.div>
      </div>
    </LayoutLandingPage>
  )
}

ExplicationModule.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  mirror: PropTypes.bool,
}

ExplicationModule.defaultProps = {
  mirror: false,
}

export default ExplicationModule
