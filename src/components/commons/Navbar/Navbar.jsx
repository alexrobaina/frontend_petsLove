import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { FiFilter } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import c from 'classnames'
import FilterNavbar from 'components/FilterNavbar'
import user from './anton-darius-thesollers-LH-NYOZmENI-unsplash.jpg'
import styles from './navbar.scss'

const Navbar = ({ searchPetsStore, optionsSelectsStore }) => {
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
      <div className={c(toggle && styles.showShadowBack)} onClick={handleToggle} />
    </>
  )
}

Navbar.propTypes = {
  searchPetsStore: PropTypes.node.isRequired,
  optionsSelectsStore: PropTypes.node.isRequired,
}
export default Navbar
