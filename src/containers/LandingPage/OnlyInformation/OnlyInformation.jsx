import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer' // 1.9K gzipped
import { motion, useAnimation } from 'framer-motion'
import PropTypes from 'prop-types'
import styles from './onlyInformation.scss'

const OnlyInformation = ({ title, text }) => {
  const animation = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1 })

  const variants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
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
    <div className={styles.containerContent}>
      <motion.div ref={ref} animate={animation} initial={variants.hidden} variants={{ variants }}>
        <div className={styles.title}>{title}</div>
        <div className={styles.text}>{text}</div>
      </motion.div>
    </div>
  )
}

OnlyInformation.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default OnlyInformation
