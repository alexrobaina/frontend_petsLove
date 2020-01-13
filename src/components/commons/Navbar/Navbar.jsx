import React, { Fragment, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import user from './anton-darius-thesollers-LH-NYOZmENI-unsplash.jpg'
import menuIcon from './sliders-h-solid.svg'
import c from 'classnames'
import anime from 'animejs'
import shapeIcon from './Shape.svg'
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
    <div className={c(styles.animationOpacity, 'animationTitle')}>
      {toggle === false ? (
        <div className={styles.container}>
          <div className={styles.menu} onClick={handleToggle}>
            {/* change icon for filter */}
            <img className={styles.menuImage} src={shapeIcon} alt="user" />
          </div>
          {/* <div className={styles.menu1}>
            <img className={styles.menuImage1} src={menuIcon} alt="user" />
          </div> */}
          <div className={styles.userContainer}>
            <img className={styles.userImage} src={user} alt="user" />
          </div>
        </div>
      ) : (
        <Fragment>
          <div className={styles.container}>
            <div className={styles.menuOpen}>
              <div className={styles.menuClose} onClick={handleToggle}>
                {/* change icon for back */}
                <img className={styles.menuImage} src={shapeIcon} alt="user" />
              </div>
            </div>
            {/* <div className={styles.menu1}>
              <img className={styles.menuImage1} src={menuIcon} alt="user" />
            </div> */}
            <div className={styles.userContainer}>
              <img className={styles.userImage} src={user} alt="user" />
            </div>
          </div>
          <div className={styles.shadowBack} onClick={handleToggle}></div>
        </Fragment>
      )}
    </div>
  )
}

Navbar.propTypes = {
  timeAnimation: PropTypes.number.isRequired
}

export default Navbar
