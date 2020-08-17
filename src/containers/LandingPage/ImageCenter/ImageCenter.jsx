import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer' // 1.9K gzipped
import { motion, useAnimation } from 'framer-motion'
import styles from './imageCenter.scss'

const ImageCenter = ({ image }) => {
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
    if (inView) {
      animation.start(variantsImage.visible)
    } else {
      animation.start(variantsImage.hidden)
    }
  }, [animation, inView])

  return (
    <div className={styles.bigRow}>
      <div className={styles.centerImage}>
        <motion.div
          ref={ref}
          animate={animation}
          initial={variantsImage.hidden}
          variants={{ variantsImage }}
        >
          <img className={styles.image} src={image} alt="shelter" />
        </motion.div>
      </div>
    </div>
  )
}

export default ImageCenter
