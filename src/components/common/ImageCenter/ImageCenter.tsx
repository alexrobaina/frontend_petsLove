import { FC } from 'react';
import styles from './imageCenter.module.scss';

interface Props {
  image: string;
}

const ImageCenter: FC<Props> = ({ image }) => {
  return (
    <div className={styles.containerImage}>
      <img alt="dog and friend" src={image} />
    </div>
  );
};

export default ImageCenter;
