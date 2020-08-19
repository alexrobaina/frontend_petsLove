import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useInView } from 'react-intersection-observer' // 1.9K gzipped
import { motion, useAnimation } from 'framer-motion'
import LayoutLandingPage from 'components/LayoutLandingPage'
import styles from './onlyInformation.scss'

const OnlyInformation = ({ title, text }) => {
  const animation = useAnimation()
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

  useEffect(() => {
    if (inView) {
      animation.start(variants.visible)
    } else {
      animation.start(variants.hidden)
    }
  }, [animation, inView])

  return (
    <LayoutLandingPage>
      <motion.div
        className={styles.containerContent}
        ref={ref}
        animate={animation}
        initial={variants.hidden}
        variants={{ variants }}
      >
        <div className={styles.title}>{title}</div>
        <div className={styles.text}>{text}</div>
      </motion.div>
    </LayoutLandingPage>
  )
}

OnlyInformation.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default OnlyInformation
