import { FC } from 'react';
import { PROFILE_PET } from 'routes/routes';
import Link from 'next/link';
import styles from './petCard.module.scss';

interface Props {
  name: string;
  petId: string;
  image?: string;
}

const PetCard: FC<Props> = ({ name = '', image = '', petId = '' }) => {
  return (
    <Link as={`${PROFILE_PET}/${petId}`} href={`${PROFILE_PET}/[pet]`}>
      <div className={styles.card}>
        {image ? (
          <img
            alt="image pet"
            className={styles.image}
            src={`${process.env.PET_BUCKET}${image}`}
          />
        ) : (
          <img
            alt="image not found"
            className={styles.image}
            src="/assets/images/imageNotFound.jpg"
          />
        )}
        <div className={styles.name}>{name}</div>
      </div>
    </Link>
  );
};

export default PetCard;
