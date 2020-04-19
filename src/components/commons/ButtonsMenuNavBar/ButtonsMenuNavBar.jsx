import React, { useCallback, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { MdDashboard, MdMenu, MdCreate, MdSearch } from 'react-icons/md'
import { FaHandHoldingHeart, FaUser } from 'react-icons/fa'
import ButtonIcon from 'components/commons/ButtonIcon'
import ToggleNavegationUser from '../Navbar/ToggleNavegationUser/ToggleNavegationUser'
import LinkNavbarUser from './LinkNavbarUser/LinkNavbarUser'
import styles from './buttonsMenuNavBar.scss'
import UserContext from '../../../Context/UserContext'

const routesUserProtectionist = [
  {
    icon: <MdDashboard size={25} />,
    text: 'Dashboard',
    link: '/dashboard',
  },
  {
    icon: <MdSearch size={25} />,
    text: 'Search Pets',
    link: '/',
  },
  {
    icon: <FaHandHoldingHeart size={25} />,
    text: 'Search volanteers',
    link: '/search-volanteers',
  },
  {
    icon: <MdCreate size={25} />,
    text: 'createPet',
    link: '/create-pet',
  },
]

const routesUserAdopter = [
  {
    icon: <MdSearch size={25} />,
    text: 'Search protectionist',
    link: '/dashboard',
  },
  {
    icon: <MdDashboard size={25} />,
    text: 'dashboard',
    link: '/dashboard',
  },
  {
    icon: <FaUser size={25} />,
    text: 'My profile',
    link: '/profile',
  },
]

const routesUserTransitUser = [
  {
    icon: <MdSearch size={25} />,
    text: 'Search protectionist',
    link: '/dashboard',
  },
  {
    icon: <MdDashboard size={25} />,
    text: 'dashboard',
    link: '/dashboard',
  },
  {
    icon: <FaUser size={25} />,
    text: 'My profile',
    link: '/profile',
  },
]

const ButtonsMenuNavBar = ({ handleMenu }) => {
  const [toggleViewMenuUser, setHandleToggleViewMenuUser] = useState(false)
  const [menuUser, setMenuUser] = useState([])
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  const initMenuUser = useCallback(() => {
    if (authStore.user.rol === 'protectionist') {
      setMenuUser(routesUserProtectionist)
    }
    if (authStore.user.rol === 'adopter') {
      setMenuUser(routesUserAdopter)
    }
    if (authStore.user.rol === 'transitUser') {
      setMenuUser(routesUserTransitUser)
    }
  }, [])

  const handleToggleViewMenuUser = useCallback(() => {
    setHandleToggleViewMenuUser(!toggleViewMenuUser)
  })

  useEffect(() => {
    initMenuUser()
  }, [])

  return (
    <>
      <div className={styles.containerButton}>
        <ButtonIcon onclick={handleToggleViewMenuUser} icon={<MdMenu size={25} />} />
      </div>
      <ToggleNavegationUser
        routesUser={routesUserProtectionist}
        handleToggleViewMenuUser={handleToggleViewMenuUser}
        toggleViewMenuUser={toggleViewMenuUser}
      />
      {menuUser.map(route => (
        <div key={route.link} className={styles.containerLinks}>
          <LinkNavbarUser route={route} handleMenu={handleMenu} />
        </div>
      ))}
    </>
  )
}

ButtonsMenuNavBar.propTypes = {
  handleMenu: PropTypes.func.isRequired,
}

export default ButtonsMenuNavBar
