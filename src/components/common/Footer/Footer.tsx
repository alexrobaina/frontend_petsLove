import { useTranslation } from 'react-i18next';
import SocialMediaButtons from 'components/common/SocialMediaButtons';
import styles from './footer.module.scss';

const Footer = () => {
  const { t } = useTranslation('landingPage');

  return (
    <>
      <div className={styles.containerFooter}>
        <div className={styles.containerRow}>
          <div className={styles.row}>
            <h2 className={styles.logo}>Pets Love</h2>
            <p className={styles.text}>{t('helpToPetMessage')}</p>
          </div>
          <div className={styles.cafecito}>
            <a
              href="https://cafecito.app/petslove"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                srcSet="https://cdn.cafecito.app/imgs/buttons/button_6.png 1x, https://cdn.cafecito.app/imgs/buttons/button_6_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_6_3.75x.png 3.75x"
                src="https://cdn.cafecito.app/imgs/buttons/button_6.png"
                alt="Invitame un café en cafecito.app"
              />
            </a>
          </div>
        </div>
        <div className={styles.socialMedia}>
          <SocialMediaButtons />
        </div>
      </div>
    </>
  );
};
export default Footer;
