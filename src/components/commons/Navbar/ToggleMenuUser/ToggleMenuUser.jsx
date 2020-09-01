import React from 'react'
import { MdPets } from 'react-icons/md'
import ButtonsMenuNavBar from 'components/commons/ButtonsMenuNavBar'
import styles from './toggleMenuUser.scss'

const ToggleMenuUser = ({ handleMenu }) => {
  return (
    <div className={styles.container} onClick={handleMenu}>
      <div className={styles.open}>
        <div className={styles.containerSelects}>
          <ButtonsMenuNavBar handleMenu={handleMenu} icon={<MdPets size={25} />} />
        </div>
      </div>
    </div>
  )
}

ToggleMenuUser.propTypes = {}

export default ToggleMenuUser
