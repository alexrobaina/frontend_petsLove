import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import c from 'classnames';
import { BsCaretDownFill } from 'react-icons/bs';
import styles from './informationCard.module.scss';

interface Props {
  text?: string;
  title: string;
  open: boolean;
  map?: ReactNode;
  icon?: ReactNode;
  handleOpen: (e) => void;
}

const InformationCard: FC<Props> = ({
  text = '',
  handleOpen,
  title = '',
  map = null,
  icon = null,
  open = false,
}) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className={c(styles.body, open && styles.open)}>
      <div onClick={handleOpen} className={c(styles.header, open && styles.open)}>
        <div className={styles.titleContainer}>
          {icon && <div className={styles.icon}>{icon}</div>}
          <div className={c(styles.title, open && styles.open)}>{title}</div>
        </div>
        <div className={c(styles.icon, open && styles.open)}>
          <BsCaretDownFill size={20} />
        </div>
      </div>
      {text && open && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className={styles.layout}
          transition={{ ease: 'easeOut' }}
        >
          <div className={c(styles.text, open && styles.open)}>{text}</div>
        </motion.div>
      )}
      {map && open && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className={styles.layout}
          transition={{ ease: 'easeOut' }}
        >
          <div className={styles.map}>{map}</div>
        </motion.div>
      )}
    </div>
  );
};

export default InformationCard;
