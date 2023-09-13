import { FC, ReactElement } from 'react';
import { motion } from 'framer-motion';
import { VARIANTS_OPACITY } from '../../../constants/animation';

import styles from './Layout.module.scss';

interface Props {
  children?: ReactElement;
  paddingLeft?: string;
}

const Layout: FC<Props> = ({ children, paddingLeft }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      style={{ paddingLeft }}
      className={styles.layout}
      variants={VARIANTS_OPACITY}
      transition={{ ease: 'easeOut', delay: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default Layout;
