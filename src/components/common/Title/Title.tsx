import { FC } from 'react';
import { motion } from 'framer-motion';
import styles from './title.module.scss';

interface Props {
  text: string;
  typeTag?: string;
  fontSize?: number;
}

const Title: FC<Props> = ({ fontSize = null, text, typeTag = 'h1' }) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ ease: 'easeOut' }}
    >
      {typeTag === 'h1' ? (
        <h1 style={{ fontSize }} className={styles.title}>
          {text}
        </h1>
      ) : (
        <h2 style={{ fontSize }} className={styles.title}>
          {text}
        </h2>
      )}
    </motion.div>
  );
};

export default Title;
