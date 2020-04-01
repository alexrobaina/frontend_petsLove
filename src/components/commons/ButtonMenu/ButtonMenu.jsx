import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { MdPets, MdDashboard, MdAssignmentInd, MdMenu } from 'react-icons/md'
import { FaHandHoldingHeart } from 'react-icons/fa'
import LinkNavbarUser from './LinkNavbarUser/LinkNavbarUser'
import ButtonIcon from '../ButtonIcon'
import ToggleNavegationUser from '../Navbar/ToggleNavegationUser/ToggleNavegationUser'
import styles from './buttonMenu.scss'

const routesUser = [
  {
    icon: <MdAssignmentInd size={25} />,
    text: 'My profile',
    link: '/profile',
  },
  {
    icon: <MdDashboard size={25} />,
    text: 'Dashboard',
    link: '/dashboard',
  },
  {
    icon: <FaHandHoldingHeart size={25} />,
    text: 'Transit home',
    link: '/transit-home',
  },
  {
    icon: <MdPets size={25} />,
    text: 'Pets adopted',
    link: '/adopted',
  },
]

const ButtonMenu = ({ handleMenu }) => {
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
        routesUser={routesUser}
        handleToggleViewMenuUser={handleToggleViewMenuUser}
        toggleViewMenuUser={toggleViewMenuUser}
      />
      {routesUser.map(route => (
        <div className={styles.containerLinks}>
          <LinkNavbarUser route={route} handleMenu={handleMenu} />
        </div>
      ))}
    </>
  )
}

ButtonMenu.propTypes = {
  handleMenu: PropTypes.func.isRequired,
}

export default ButtonMenu
