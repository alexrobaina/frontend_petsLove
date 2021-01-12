import { ReactNode, FC } from 'react';
import { motion } from 'framer-motion';
import styles from './medicalItemsContainer.module.scss';

interface Props {
  children: ReactNode;
}

const MedicalItemsContainer: FC<Props> = ({ children }) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={styles.containerMedicalItems}
      transition={{ ease: 'easeOut', delay: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export default MedicalItemsContainer;
