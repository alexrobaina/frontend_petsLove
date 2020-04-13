import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { MdPets, MdDashboard, MdMenu, MdCreate } from 'react-icons/md'
import { FaClipboardList, FaHandHoldingHeart } from 'react-icons/fa'
import ButtonIcon from 'components/commons/ButtonIcon'
import ToggleNavegationUser from '../Navbar/ToggleNavegationUser/ToggleNavegationUser'
import LinkNavbarUser from './LinkNavbarUser/LinkNavbarUser'
import styles from './buttonsMenuNavBar.scss'

const routesUserProtectionist = [
  {
    icon: <MdDashboard size={25} />,
    text: 'dashboard',
    link: '/dashboard',
  },
  {
    icon: <FaHandHoldingHeart size={25} />,
    text: 'transitUser',
    link: '/user-transit',
  },
  {
    icon: <MdCreate size={25} />,
    text: 'createPet',
    link: '/create-pet',
  },
  {
    icon: <MdPets size={25} />,
    text: 'petsAdopted',
    link: '/pets-adopted',
  },
  {
    icon: <FaClipboardList size={25} />,
    text: 'forAdoption',
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
