import { ReactNode, FC } from 'react';
import { motion } from 'framer-motion';
import styles from './layout.module.scss';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={styles.layout}
      transition={{ ease: 'easeOut', delay: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default Layout;
