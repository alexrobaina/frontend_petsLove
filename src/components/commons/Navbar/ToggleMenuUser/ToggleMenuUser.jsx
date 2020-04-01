import React from 'react'
import { MdPets } from 'react-icons/md'
import ButtonMenu from 'components/commons/ButtonMenu'
import styles from './toggleMenuUser.scss'

const ToggleMenuUser = ({ handleMenu }) => {
  return (
    <div className={styles.container}>
      <div className={styles.open}>
        <div className={styles.containerSelects}>
          <ButtonMenu handleMenu={handleMenu} icon={<MdPets size={25} />} />
        </div>
      </div>
    </div>
  )
}

ToggleMenuUser.propTypes = {}

export default ToggleMenuUser
