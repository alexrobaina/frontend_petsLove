import React from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import styles from './scrollUp.module.scss';

const ButtonBack = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div onClick={scrollTop} className={styles.containerButton}>
      <div className={styles.up}>
        <AiOutlineArrowUp size={25} />
      </div>
    </div>
  );
};

export default ButtonBack;
