import React, { Fragment, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import user from './anton-darius-thesollers-LH-NYOZmENI-unsplash.jpg'
import { FiFilter } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import c from 'classnames'
import { Animated } from 'react-animated-css'
import FormFilterNavbar from 'components/FormFilterNavbar'
import styles from './navbar.scss'

const Navbar = ({ timeAnimation }) => {
  const [toggle, setToggle] = useState(false)

  const handleToggle = useCallback(() => {
    setToggle(!toggle)
  })

  return (
    <>
      <div className={styles.userContainer}>
        <img className={styles.userImage} src={user} alt="user" />
      </div>
      <div className={styles.iconFilter}>
        <FiFilter size={25} onClick={handleToggle} />
      </div>
      <div className={c(toggle ? styles.open : styles.showMenu)}>
        <div className={styles.iconClose} onClick={handleToggle}>
          <MdClose size={25} />
        </div>
        <div className={styles.titleNavbar}>
          <div>More filters</div>
        </div>
        <div>
          <FormFilterNavbar />
        </div>
      </div>
      <div className={c(toggle && styles.showShadowBack)} onClick={handleToggle}></div>
    </>
  )
}

Navbar.propTypes = {
  timeAnimation: PropTypes.number.isRequired,
}

export default Navbar