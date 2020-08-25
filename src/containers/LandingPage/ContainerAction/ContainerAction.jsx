import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { useInView } from 'react-intersection-observer' // 1.9K gzipped
import { motion, useAnimation } from 'framer-motion'
import LayoutLandingPage from 'components/LayoutLandingPage'
import adopter from './adopter.png'
import pcCat from './pcGatite.png'
import vet from './vet.png'
import dev from './dev.png'
import transit from './transit.png'
import styles from './containerAction.scss'

const ContainerAction = ({ title, text, image, mirror }) => {
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
    if (inView) {
      animation.start(variantsImage.visible)
    }
  }, [animation, inView])

  return (
    <LayoutLandingPage>
      <div className={styles.title}>Te gustaria adoptar</div>
      <div className={styles.container}>
        <motion.div
          ref={ref}
          animate={animation}
          variants={{ variantsImage }}
          initial={variantsImage.hidden}
          className={c(styles.containerInformation, mirror && styles.mirror)}
        >
          <div className={styles.containerCard}>
            <img className={styles.image} src={adopter} alt="adopter" />
            <div className={styles.subTitle}>Adoptar</div>
          </div>
          <div className={styles.containerCard}>
            <img className={styles.image} src={transit} alt="adopter" />
            <div className={styles.subTitle}>Administrar refugio</div>
          </div>
        </motion.div>
        <motion.div
          ref={ref}
          animate={animation}
          variants={{ variantsImage }}
          initial={variantsImage.hidden}
          className={c(styles.containerInformation, mirror && styles.mirror)}
        >
          <div className={styles.containerCard}>
            <img className={styles.image} src={dev} alt="adopter" />
            <div className={styles.subTitle}>Transito de mascotas</div>
          </div>
          <div className={styles.containerCard}>
            <img className={styles.image} src={vet} alt="adopter" />
            <div className={styles.subTitle}>Administrar veterinaria</div>
          </div>
        </motion.div>
      </div>
    </LayoutLandingPage>
  )
}

ContainerAction.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  mirror: PropTypes.bool,
}

ContainerAction.defaultProps = {
  mirror: false,
}

export default ContainerAction
