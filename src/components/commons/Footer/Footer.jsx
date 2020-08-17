import React from 'react'
import { useTranslation } from 'react-i18next'
import { IoMdHeart } from 'react-icons/io'
import SocialMediaButtons from 'components/commons/SocialMediaButtons'
import styles from './footer.scss'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.containerFooter}>
      <div className={styles.socialButtons}>
        <SocialMediaButtons title={t('Nuestras redes')} />
      </div>
      <div className={styles.textFooter}>
        PetsLove hecho con <IoMdHeart className={styles.icon} size={15} />
      </div>
    </div>
  )
}
export default Footer
