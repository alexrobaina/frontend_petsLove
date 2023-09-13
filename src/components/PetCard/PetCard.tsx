import { FC, useCallback, useState } from 'react';
import Link from 'next/link';
import styles from './petCard.module.scss';

interface Props {
  name: string;
  petId: string;
  image?: string;
}

const PetCard: FC<Props> = ({ name = '', image = '', petId = '' }) => {
  const [imageValidate, setImageValidate] = useState(
    `https://petslove-bucket-2.s3.amazonaws.com/${image}`,
  );

  const errorImage = useCallback((event: any) => {
    if (event.isTrusted) {
      setImageValidate('/public/assets/images/imageNotFound.jpg');
    } else {
      setImageValidate(`https://petslove-bucket-2.s3.amazonaws.com/${image}`);
    }
  }, []);

  return (
    <Link as={`profilePet/${petId}`} href={`profilePet/[pet]`}>
      <div className={styles.card}>
        {image ? (
          <img
            alt={`${name ? name : 'Pet'}`}
            src={imageValidate}
            onError={errorImage}
            className={styles.image}
          />
        ) : (
          <img
            alt="Not Found"
            className={styles.image}
            src="/public/assets/images/imageNotFound.jpg"
          />
        )}
        <div className={styles.name}>{name}</div>
      </div>
    </Link>
  );
};

export default PetCard;
