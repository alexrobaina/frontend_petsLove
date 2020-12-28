import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaTwitter, FaInstagram, FaFacebookSquare } from 'react-icons/fa';
import styles from './socialMediaButtons.module.scss';

function SocialMediaButtons() {
  const { t } = useTranslation('socialMediaButtons');
  return (
    <div className={styles.container}>
      <a
        href="https://github.com/alexrobaina/frontend_petsLove"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Tooltip title={t('repositoryPetsLove')}>
          <div className={styles.icon}>
            <FaGithub size={25} />
          </div>
        </Tooltip>
      </a>
      <a
        href="https://www.instagram.com/petslove.app"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Tooltip title={t('twitter')}>
          <div className={styles.icon}>
            <FaTwitter size={25} />
          </div>
        </Tooltip>
      </a>
      <a
        href="https://www.instagram.com/petslove.app"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Tooltip title="Instagram">
          <div className={styles.icon}>
            <FaInstagram size={25} />
          </div>
        </Tooltip>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.facebook.com/Pets-love-316657072374034"
      >
        <Tooltip title="Facebook">
          <div className={styles.icon}>
            <FaFacebookSquare size={25} />
          </div>
        </Tooltip>
      </a>
    </div>
  );
}

export default SocialMediaButtons;
