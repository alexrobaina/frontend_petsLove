import { FC, useCallback, useState } from 'react';
import { PROFILE_PET } from 'routes/routes';
import Link from 'next/link';
import styles from './petCard.module.scss';

interface Props {
  name: string;
  petId: string;
  image?: string;
}

const PetCard: FC<Props> = ({ name = '', image = '', petId = '' }) => {
  const [imageValidate, setImageValidate] = useState(
    `https://petslove-bucket-2.s3.amazonaws.com/pets/${image}`,
  );

  const errorImage = useCallback((event) => {
    if (event.isTrusted) {
      setImageValidate('/assets/images/imageNotFound.jpg');
    } else {
      setImageValidate(`https://petslove-bucket-2.s3.amazonaws.com/pets/${image}`);
    }
  }, []);

  return (
    <Link as={`${PROFILE_PET}/${petId}`} href={`${PROFILE_PET}/[pet]`}>
      <div className={styles.card}>
        {image ? (
          <img
            alt="pet"
            src={imageValidate}
            onError={errorImage}
            className={styles.image}
          />
        ) : (
          <img
            alt="not-found"
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
