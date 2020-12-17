import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BiHomeHeart } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';
import Button from 'components/common/Button';
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
          <Button
            circle
            transparent
            text="Adoptar mascota"
            icon={<BiHomeHeart size={25} />}
          />
        </div>
        <div className={styles.containerButton}>
          <Button circle icon={<AiFillHeart size={25} />} />
        </div>
        <div className={styles.menuLanguage}>
          <ChangeLanguage />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
