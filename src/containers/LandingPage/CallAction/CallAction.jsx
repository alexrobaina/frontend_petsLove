import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer' // 1.9K gzipped
import { motion, useAnimation } from 'framer-motion'
import PropTypes from 'prop-types'
import Button from 'components/commons/Button'
import styles from './callAction.scss'

const CallAction = ({ title, textButton, handleAction }) => {
  const animation = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1 })

  const variantsTitle = {
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
      animation.start(variantsTitle.visible)
    } else {
      animation.start(variantsTitle.hidden)
    }
  }, [animation, inView])

  return (
    <div className={styles.containerAction}>
      <motion.div
        ref={ref}
        animate={animation}
        variants={{ variantsTitle }}
        initial={variantsTitle.hidden}
        className={styles.actionSearchPets}
      >
        <div className={styles.title}>{title}</div>
        {handleAction && (
          <div className={styles.buttonSearchPets}>
            <Button handleClick={handleAction} bigButton text={textButton} />
          </div>
        )}
      </motion.div>
    </div>
  )
}

CallAction.propTypes = {
  textButton: PropTypes.string,
  handleAction: PropTypes.func,
  title: PropTypes.string.isRequired,
}

CallAction.defaultProps = {
  textButton: '',
  handleAction: null,
}

export default CallAction
