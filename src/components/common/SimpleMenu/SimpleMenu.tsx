import React, { FC, ReactElement } from 'react';
import c from 'classnames';
import { motion } from 'framer-motion';
import styles from './simpleMenu.module.scss';

interface Props {
  isVisible: boolean;
  children: ReactElement;
  setIsVisible: Function;
}
const SimpleMenu: FC<Props> = ({ setIsVisible, children, isVisible }) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        onClick={() => setIsVisible(false)}
        transition={{ ease: 'easeOut' }}
        className={c(styles.containerMenu, isVisible && styles.isVisible)}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SimpleMenu;
