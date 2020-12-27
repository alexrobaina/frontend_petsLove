import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styles from './callAction.module.scss';

const CallAction = () => {
  const { t } = useTranslation('landingPage');

  return (
    <motion.div
      drag="x"
      style={{ width: 1500 }}
      dragConstraints={{ left: -500, right: 300 }}
    >
      <motion.button className={styles.buttonAction}>
        <div className={styles.containerCard}>
          <img
            alt="adopter"
            className={styles.image}
            src="/assets/images/landingPage/actions/adopter.png"
          />
          <div className={styles.subTitle}>{t('Adoptar')}</div>
        </div>
      </motion.button>
      <motion.button className={styles.buttonAction}>
        <div className={styles.containerCard}>
          <img
            alt="transit"
            className={styles.image}
            src="/assets/images/landingPage/actions/transit.png"
          />
          <div className={styles.subTitle}>{t('Dar en adopción')}</div>
        </div>
      </motion.button>
      <motion.button className={styles.buttonAction}>
        <div className={styles.containerCard}>
          <img
            alt="transit"
            className={styles.image}
            src="/assets/images/landingPage/actions/transit.png"
          />
          <div className={styles.subTitle}>{t('Dar en adopción')}</div>
        </div>
      </motion.button>
    </motion.div>
  );
};

export default CallAction;
