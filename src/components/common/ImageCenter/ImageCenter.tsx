import { FC } from 'react';
import styles from './imageCenter.module.scss';

interface Props {
  image: string;
}

const ImageCenter: FC<Props> = ({ image }) => {
  return (
    <div className={styles.containerImage}>
      {image ? (
        <img className={styles.imageProfile} alt="dog and friend" src={image} />
      ) : (
        <img
          className={styles.imageProfile}
          alt="dog and friend"
          src="/assets/images/imageNotFound.jpg"
        />
      )}
    </div>
  );
};

export default ImageCenter;
