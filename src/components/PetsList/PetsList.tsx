import { FC } from 'react';
import { motion } from 'framer-motion';
import PetCard from 'components/common/PetCard';
import Loading from 'components/common/Loading';
import ErrorMessage from 'components/common/ErrorMessage';
import styles from './layout.module.scss';

interface Props {
  store: any;
}

const PetsList: FC<Props> = ({ store }) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  if (store.isLoading) {
    <Loading />;
  }

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className={styles.cardLayout}
        transition={{ ease: 'easeOut', delay: 0.5 }}
      >
        {store.pets.map((pet) => {
          return (
            <PetCard
              key={pet._id}
              petId={pet._id}
              name={pet.name}
              image={pet.image?.filenames[0]}
            />
          );
        })}
      </motion.div>
      {store.pets.length === 0 && (
        <ErrorMessage text="No encontramos mascotas" typeMessage="warning" />
      )}
    </>
  );
};

export default PetsList;
