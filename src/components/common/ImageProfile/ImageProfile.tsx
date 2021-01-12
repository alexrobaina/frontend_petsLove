import { FC } from 'react';
import c from 'classnames';
import { FaHeartbeat } from 'react-icons/fa';
import { BiCalendarHeart } from 'react-icons/bi';
import styles from './imageProfile.module.scss';

interface Props {
  image: string;
}

const ImageProfile: FC<Props> = ({ image }) => {
  return (
    <div className={styles.containerImageProfile}>
      {image ? (
        <img alt="pet" className={styles.imageProfile} src={image} />
      ) : (
        <img
          alt="image-not-found"
          className={styles.imageProfile}
          src="/assets/images/imageNotFound.jpg"
        />
      )}
    </div>
  );
};

export default ImageProfile;
