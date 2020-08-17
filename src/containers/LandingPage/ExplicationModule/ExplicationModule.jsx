import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useInView } from 'react-intersection-observer' // 1.9K gzipped
import { motion, useAnimation } from 'framer-motion'
import c from 'classnames'
import styles from './explicationModule.scss'

const ExplicationModule = ({ title, text, image, mirror }) => {
  const animation = useAnimation()
  const animationText = useAnimation()
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

  const variantsText = {
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 2,
        duration: 0.3,
      },
    },
    hidden: {
      x: 0,
      opacity: 0,
    },
  }

  useEffect(() => {
    if (inView) {
      animation.start(variantsImage.visible)
      animationText.start(variantsText.visible)
    } else {
      animation.start(variantsImage.hidden)
      animationText.start(variantsText.hidden)
    }
  }, [animation, inView])

  return (
    <div className={styles.container}>
      <div className={c(styles.containerInformation, mirror && styles.mirror)}>
        <motion.div
          ref={ref}
          animate={animationText}
          variants={{ variantsText }}
          initial={variantsText.hidden}
        >
          <div className={styles.title}>{title}</div>
          <div className={styles.text}>{text}</div>
        </motion.div>
      </div>
      <div className={c(styles.containerImage, mirror && styles.mirror)}>
        <motion.div
          ref={ref}
          animate={animation}
          variants={{ variantsImage }}
          initial={variantsImage.hidden}
        >
          <img className={styles.image} src={image} alt="adopter" />
        </motion.div>
      </div>
    </div>
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
