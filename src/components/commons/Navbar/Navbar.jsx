import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import user from './anton-darius-thesollers-LH-NYOZmENI-unsplash.jpg'
import { FiFilter } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import c from 'classnames'
import FilterNavbar from 'components/FilterNavbar'
import styles from './navbar.scss'

const Navbar = ({ timeAnimation, searchPetsStore, optionsSelectsStore }) => {
  const [toggle, setToggle] = useState(false)

  const handleToggle = useCallback(() => {
    setToggle(!toggle)
  })

  return (
    <>
      <div className={styles.containerNavbar}>
        <div className={styles.iconFilter}>
          <FiFilter size={25} onClick={handleToggle} />
        </div>
        <div>
          <img className={styles.userImage} src={user} alt="user" />
        </div>
      </div>
      <div className={c(toggle ? styles.open : styles.showMenu)}>
        <div className={styles.iconClose} onClick={handleToggle}>
          <MdClose size={25} />
        </div>
        <div className={styles.titleNavbar}>
          <div>More filters</div>
        </div>
        <div className={styles.containerSelects}>
          <FilterNavbar
            optionsSelectsStore={optionsSelectsStore}
            searchPetsStore={searchPetsStore}
          />
        </div>
      </div>
      <div className={c(toggle && styles.showShadowBack)} onClick={handleToggle}></div>
    </>
  )
}

Navbar.propTypes = {
  timeAnimation: PropTypes.number,
  searchPetsStore: PropTypes.object.isRequired,
  optionsSelectsStore: PropTypes.object.isRequired,
}

Navbar.defaultProps = {
  timeAnimation: 3,
}

export default Navbar
