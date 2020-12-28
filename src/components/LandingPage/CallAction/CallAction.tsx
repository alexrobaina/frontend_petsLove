import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './callAction.module.scss';

const CallAction = () => {
  const { t } = useTranslation('landingPage');

  return (
    <motion.div
      drag="x"
      style={{ width: 1500 }}
      className={styles.container}
      dragConstraints={{ left: -300, right: 300 }}
    >
      <motion.button className={styles.buttonAction}>
        <Link href="/adoptInformation">
          <div className={styles.card}>
            <img
              alt="adopter"
              className={styles.image}
              src="/assets/images/landingPage/actions/adopter.png"
            />
            <div className={styles.action}>{t('adopt')}</div>
          </div>
        </Link>
      </motion.button>
      <motion.button className={styles.buttonAction}>
        <Link href="/volanteerInformation">
          <div className={styles.card}>
            <img
              alt="transit"
              className={styles.image}
              src="/assets/images/landingPage/actions/transit.png"
            />
            <div className={styles.action}>{t('volunteer')}</div>
          </div>
        </Link>
      </motion.button>
      <motion.button className={styles.buttonAction}>
        <Link href="/shelterInformation">
          <div className={styles.card}>
            <img
              alt="animalProtector"
              className={styles.image}
              src="/assets/images/landingPage/actions/dev.png"
            />
            <div className={styles.action}>{t('animalProtector')}</div>
          </div>
        </Link>
      </motion.button>
    </motion.div>
  );
};

export default CallAction;
