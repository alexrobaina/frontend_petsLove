import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { FiFilter } from 'react-icons/fi'
import { useHistory } from 'react-router'
import { MdClose } from 'react-icons/md'
import c from 'classnames'
import FilterNavbar from 'components/FilterNavbar'
import user from './anton-darius-thesollers-LH-NYOZmENI-unsplash.jpg'
import noImg from './noimg.png'
import styles from './navbar.scss'

const Navbar = ({ searchPetsStore, optionsSelectsStore, isUserLogin }) => {
  const history = useHistory()
  const [toggle, setToggle] = useState(false)

  const goToLogin = useCallback(() => history.push('/login'), [])

  const goToRegister = useCallback(() => history.push('/register'), [])

  const handleToggle = useCallback(() => {
    setToggle(!toggle)
  })

  return (
    <>
      <div className={styles.containerNavbar}>
        <div className={styles.iconFilter}>
          <FiFilter size={25} onClick={handleToggle} />
        </div>
        {isUserLogin ? (
          <div className={styles.containerButtonslog}>
            <div onClick={goToLogin} className={styles.textLogin}>
              Login
            </div>
            <div onClick={goToRegister} className={styles.textLogin}>
              Register
            </div>
          </div>
        ) : (
          <div>
            <img className={styles.userImage} src={isUserLogin ? user : noImg} alt="user" />
          </div>
        )}
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
  isUserLogin: PropTypes.bool,
}

Navbar.defaultProps = {
  isUserLogin: true,
}

export default Navbar
