import { motion } from 'framer-motion';
import styles from './layout.module.scss';

const Layout = ({ children }) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ ease: 'easeOut', delay: 0.5 }}
    >
      <div className={styles.layout}>{children}</div>
    </motion.div>
  );
};

export default Layout;
