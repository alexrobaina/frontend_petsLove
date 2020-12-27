import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BiHomeHeart } from 'react-icons/bi';
import Button from 'components/common/Button';
import LinkButton from 'components/common/LinkButton';
import ChangeLanguage from './ChangeLanguage';
import styles from './navbar.module.scss';

const Navbar = () => {
  const { i18n } = useTranslation();
  let languageStorage;

  useEffect(() => {
    languageStorage = localStorage.getItem('i18nextLng');
  }, []);

  const changeLanguage = (languageSelected) => {
    i18n.changeLanguage(languageSelected);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.col}>
        <div className={styles.containerButton}>
          <LinkButton url="/" icon={<BiHomeHeart size={25} />} />
        </div>
        <div className={styles.menuLanguage}>
          <ChangeLanguage />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
