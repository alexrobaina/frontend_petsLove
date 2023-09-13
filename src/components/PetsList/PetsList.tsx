import { FC } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import BaseErrorMessage from 'components/common/BaseErrorMessage';
import BaseLoading from 'components/common/BaseLoading';
import PetCard from 'components/PetCard';

import styles from './PetsList.module.scss';
import BaseButton from 'components/common/BaseButton';

interface Props {
  pets: any;
  isLoading: boolean;
}

const PetsList: FC<Props> = ({ pets, isLoading }) => {
  const router = useRouter();
  const { data: session }: any = useSession();
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const handleClick = (path: string) => {
    router.push(`editPet/${path}`);
  };

  return (
    <>
      {isLoading && (
        <div className={styles.loading}>
          <BaseLoading />
        </div>
      )}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className={styles.cardLayout}
        transition={{ ease: 'easeOut', delay: 0.5 }}
      >
        {pets &&
          pets.map((pet: any) => {
            return (
              <div className="d-flex flex-direction-col">
                <PetCard key={pet.id} petId={pet.id} name={pet.name} image={pet.images} />
                {session && session.user?.id == pet.userId && (
                  <div style={{ marginTop: '10px' }}>
                    <BaseButton
                      text="Editar mascota"
                      onClick={() => handleClick(pet.id)}
                    />
                  </div>
                )}
              </div>
            );
          })}
      </motion.div>
      {pets?.length === 0 && <BaseErrorMessage text="No encontramos mascotas" />}
    </>
  );
};

export default PetsList;
