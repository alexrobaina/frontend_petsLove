import React from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-animated-css'
import styles from './layoutLandingPage.scss'

const LayoutLandingPage = ({ title, information, children, name }) => {
  return (
    <Animated
      animationIn="fadeIn"
      animationOut="fadeInUp"
      animationInDelay={1000}
      animationInDuration={300}
    >
      <div className={styles.containerLayout}>
        <div className={styles.containerTitle}>
          <div className={styles.title}>{title}</div>
          <div className={styles.name}>{name}</div>
        </div>
        <div className={styles.information}>{information}</div>
        {children}
      </div>

      <div className={styles.spaceBotton} />
    </Animated>
  )
}

LayoutLandingPage.propTypes = {
  title: PropTypes.string,
  information: PropTypes.string,
  children: PropTypes.node.isRequired,
}

LayoutLandingPage.defaultProps = {
  title: '',
  information: '',
}

export default LayoutLandingPage
