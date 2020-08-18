import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { useTranslation } from 'react-i18next'
import { FaGithub, FaTwitter, FaInstagram, FaFacebookSquare } from 'react-icons/fa'
import styles from './socialMediaButtons.scss'

function SocialMediaButtons() {
  const { t } = useTranslation('socialMediaButtons')
  return (
    <div className={styles.container}>
      <Tooltip title={t('creatorPetsLove')}>
        <div className={styles.icon}>
          <FaGithub size={25} />
        </div>
      </Tooltip>
      <Tooltip title={t('twitter')}>
        <div className={styles.icon}>
          <FaTwitter size={25} />
        </div>
      </Tooltip>
      <a href="https://www.instagram.com/petslove.app" rel="noopener noreferrer" target="_blank">
        <div className={styles.icon}>
          <FaInstagram size={25} />
        </div>
      </a>
      <a
        href="https://www.facebook.com/Pets-love-316657072374034"
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className={styles.icon}>
          <FaFacebookSquare size={25} />
        </div>
      </a>
    </div>
  )
}

export default SocialMediaButtons
