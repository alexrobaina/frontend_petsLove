import React from 'react'
import { IoMdHeart } from 'react-icons/io'
import LayoutTrantitions from 'components/commons/LayoutTrantitions'
import styles from './footer.scss'

const Footer = () => {
  return (
    <div className={styles.containerFooter}>
      <div className={styles.textFooter}>
        PetsLove hecho con <IoMdHeart className={styles.icon} size={15} />{' '}
      </div>
    </div>
  )
}
export default Footer
