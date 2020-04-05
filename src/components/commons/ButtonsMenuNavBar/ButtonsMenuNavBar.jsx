import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { MdPets, MdDashboard, MdMenu } from 'react-icons/md'
import { FaClipboardList, FaHandHoldingHeart } from 'react-icons/fa'
import ButtonIcon from 'components/commons/ButtonIcon'
import ToggleNavegationUser from '../Navbar/ToggleNavegationUser/ToggleNavegationUser'
import LinkNavbarUser from './LinkNavbarUser/LinkNavbarUser'
import styles from './buttonsMenuNavBar.scss'

const routesUserProtectionist = [
  {
    icon: <MdDashboard size={25} />,
    text: 'Dashboard',
    link: '/dashboard',
  },
  {
    icon: <FaHandHoldingHeart size={25} />,
    text: 'Transit user',
    link: '/user-transit',
  },
  {
    icon: <MdPets size={25} />,
    text: 'Pets adopted',
    link: '/pets-adopted',
  },
  {
    icon: <FaClipboardList size={25} />,
    text: 'My pets',
    link: '/my-pets',
  },
]

const ButtonsMenuNavBar = ({ handleMenu }) => {
  const [toggleViewMenuUser, setHandleToggleViewMenuUser] = useState(false)

  const handleToggleViewMenuUser = useCallback(() => {
    setHandleToggleViewMenuUser(!toggleViewMenuUser)
  })

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
      {routesUserProtectionist.map(route => (
        <div className={styles.containerLinks}>
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
