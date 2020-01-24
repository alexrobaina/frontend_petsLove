import React, { Fragment, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FiFilter } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import c from 'classnames'
import { Animated } from 'react-animated-css'
import anime from 'animejs'
import user from './anton-darius-thesollers-LH-NYOZmENI-unsplash.jpg'
import styles from './navbar.module.scss'

const Navbar = ({ timeAnimation }) => {
  const [toggle, setToggle] = useState(false)

  const handleToggle = useCallback(() => {
    setToggle(!toggle)
  })

  useEffect(() => {
    anime({
      targets: '.animationTitle',
      opacity: 1,
      easing: 'linear',
      duration: 1000,
      delay: timeAnimation,
    })
  }, [])

  return (
    <div>
      {toggle ? (
        <Animated animationIn="bounceInRight" isVisible={true} animationInDuration={2000}>
          <div className={c(styles.container, 'animationTitle', styles.animationTitle)}>
            <div className={styles.menuOpen}>
              <div className={styles.menuClose} onClick={handleToggle}>
                <MdClose size={25} />
              </div>
            </div>
            <div className={styles.userContainer}>
              <img className={styles.userImage} src={user} alt="user" />
            </div>
            <div className={styles.shadowBack} onClick={handleToggle}></div>
          </div>
        </Animated>
      ) : (
        <div className={styles.container}>
          <Animated animationIn="bounceInRigt" isVisible={true} animationInDuration={2000}>
            <div className={styles.menu} onClick={handleToggle}>
              <FiFilter size={25} />
            </div>
        </Animated>
            <div className={styles.userContainer}>
              <img className={styles.userImage} src={user} alt="user" />
            </div>
          </div>
      )}
    </div>
  )
}

Navbar.propTypes = {
  timeAnimation: PropTypes.number.isRequired,
}

export default Navbar
