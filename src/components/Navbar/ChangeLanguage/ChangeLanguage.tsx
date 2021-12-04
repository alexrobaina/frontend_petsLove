import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaLanguage } from 'react-icons/fa';
import Button from 'components/common/Button';
import SimpleMenu from 'components/common/SimpleMenu';
import styles from './changeLanguage.module.scss';

const ChangeLanguage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { i18n } = useTranslation();

  const changeLanguage = (languageSelected) => {
    i18n.changeLanguage(languageSelected);
  };

  return (
    <>
      <div className={styles.containerButton}>
        <Button
          circle
          transparent
          onClick={() => setIsVisible(true)}
          icon={<FaLanguage size={35} />}
        />
        <SimpleMenu isVisible={isVisible} setIsVisible={setIsVisible}>
          <div className={styles.menu}>
            <div className={styles.buttonLanguage} onClick={() => changeLanguage('es')}>
              ES
            </div>
            <div className={styles.buttonLanguage} onClick={() => changeLanguage('en')}>
              EN
            </div>
          </div>
        </SimpleMenu>
      </div>
    </>
  );
};

export default ChangeLanguage;
