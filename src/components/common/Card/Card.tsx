import { FC } from 'react';
import Link from 'next/link';
import styles from './card.module.scss';

interface Props {
  name: string;
  petId: string;
  image?: string;
}

const Card: FC<Props> = ({ name = '', image = '', petId = '' }) => {
  return (
    <Link as={`/profilePet/${petId}`} href={`/profilePet/[pet]`}>
      <div className={styles.card}>
        {image ? (
          <img alt="image pet" className={styles.image} src={image} />
        ) : (
          <img alt="image not found" className={styles.image} src="/imageNotFound.jpg" />
        )}
        <div className={styles.name}>{name}</div>
      </div>
    </Link>
  );
};

export default Card;
