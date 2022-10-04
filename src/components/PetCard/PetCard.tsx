import { FC, useCallback, useState } from 'react';
import Link from 'next/link';
import styles from './petCard.module.scss';
import BaseButton from 'components/common/BaseButton';
import { red300 } from 'styles/colors';
import BaseText from 'components/common/BaseText';

interface Props {
  name: string;
  petId: string;
  image?: string;
  description: string;
}

const PetCard: FC<Props> = ({ name = '', image = '', petId = '', description = '' }) => {
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
    <div>
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
      <BaseText marginTop={5} medium text={description} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <BaseButton marginTop={10} text="Editar mascota" />
        <BaseButton backgroundColor={red300} marginTop={10} text="Borrar" />
      </div>
    </div>
  );
};

export default PetCard;
