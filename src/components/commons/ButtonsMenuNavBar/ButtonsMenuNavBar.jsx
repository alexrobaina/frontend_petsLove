import React, { useCallback, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { MdDashboard, MdMenu } from "react-icons/md";
import { useTranslation } from 'react-i18next'
import UserContext from 'Context/UserContext'
import { AiFillFileAdd } from "react-icons/ai";
import { PROTECTIONIST, TRANSIT_USER, ADOPTER, VET } from 'config/roles'
import { FaHandHoldingHeart, FaPeopleCarry, FaUser } from 'react-icons/fa'
import ButtonIcon from 'components/commons/ButtonIcon'
import ToggleNavegationUser from '../Navbar/ToggleNavegationUser/ToggleNavegationUser'
import LinkNavbarUser from './LinkNavbarUser/LinkNavbarUser'
import styles from './buttonsMenuNavBar.scss'

const routesUserProtectionist = [
  {
    icon: <FaUser size={22} />,
    text: 'myProfile',
    link: '/profile-user',
    haveId: true,
  },
  {
    icon: <MdDashboard size={25} />,
    text: 'dashboard',
    link: '/dashboard',
  },
  {
    icon: <FaHandHoldingHeart size={25} />,
    text: 'searchVolanteers',
    link: '/search-volanteers',
  },
  {
    icon: <FaPeopleCarry size={22} />,
    text: 'Search Protectionists',
    link: '/search-protectionist',
  },
  {
    icon: <AiFillFileAdd size={25} />,
    text: 'createPet',
    link: '/create-pet',
  },
]

const routesUserVet = [
  {
    icon: <FaUser size={22} />,
    text: 'myProfile',
    link: '/profile-user',
    haveId: true,
  },
  {
    icon: <MdDashboard size={25} />,
    text: 'dashboard',
    link: '/dashboard',
  },
  {
    icon: <FaHandHoldingHeart size={25} />,
    text: 'searchVolanteers',
    link: '/search-volanteers',
  },
  {
    icon: <FaPeopleCarry size={22} />,
    text: 'Search Protectionists',
    link: '/search-protectionist',
  },
  {
    icon: <AiFillFileAdd size={25} />,
    text: 'createPet',
    link: '/create-pet',
  },
]

const routesUserAdopter = [
  {
    icon: <FaUser size={22} />,
    text: 'myProfile',
    link: '/profile-user',
    haveId: true,
  },
  {
    icon: <MdDashboard size={25} />,
    text: 'dashboard',
    link: '/dashboard',
  },
  {
    icon: <FaPeopleCarry size={22} />,
    text: 'Search Protectionists',
    link: '/search-protectionist',
  },
  {
    icon: <AiFillFileAdd size={25} />,
    text: 'createPet',
    link: '/create-pet',
  },
]

const routesUserTransitUser = [
  {
    icon: <FaUser size={22} />,
    text: 'myProfile',
    link: '/profile-user',
    haveId: true,
  },
  {
    icon: <MdDashboard size={25} />,
    text: 'dashboard',
    link: '/dashboard',
  },
  {
    icon: <FaPeopleCarry size={22} />,
    text: 'Search Protectionists',
    link: '/search-protectionist',
  },
]

const ButtonsMenuNavBar = ({ handleMenu }) => {
  const { t } = useTranslation('navbar')
  const [toggleViewMenuUser, setHandleToggleViewMenuUser] = useState(false)
  const [menuUser, setMenuUser] = useState([])
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  const initMenuUser = useCallback(() => {
    if (authStore.user.role === PROTECTIONIST) {
      setMenuUser(routesUserProtectionist)
    }
    if (authStore.user.role === ADOPTER) {
      setMenuUser(routesUserAdopter)
    }
    if (authStore.user.role === TRANSIT_USER) {
      setMenuUser(routesUserTransitUser)
    }
    if (authStore.user.role === VET) {
      setMenuUser(routesUserVet)
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
        toggleViewMenuUser={toggleViewMenuUser}
        handleToggleViewMenuUser={handleToggleViewMenuUser}
      />
      {menuUser.map(route => {
        return (
          <div key={route.link} className={styles.containerLinks}>
            <LinkNavbarUser
              link={route.link}
              icon={route.icon}
              haveId={route.haveId}
              id={authStore.user._id}
              handleMenu={handleMenu}
              text={t(`${route.text}`)}
            />
          </div>
        )
      })}
    </>
  )
}

ButtonsMenuNavBar.propTypes = {
  handleMenu: PropTypes.func.isRequired,
}

export default ButtonsMenuNavBar
