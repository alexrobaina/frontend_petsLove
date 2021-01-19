import { ReactNode, FC } from 'react';
import { motion } from 'framer-motion';
import { findDimensionValueType } from 'framer-motion/types/render/dom/utils/value-types';
import styles from './gallery.module.scss';

interface Props {
  images?: Array<string>;
}

const Gallery: FC<Props> = ({ images = [] }) => {
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
      {images.map((image) => {
        return (
          <img key={image} src={image} className={styles.galleryContent} alt="pet" />
        );
      })}
    </motion.div>
  );
};

export default Gallery;
