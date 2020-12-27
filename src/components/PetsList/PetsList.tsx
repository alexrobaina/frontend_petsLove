import { useState, FC } from 'react';
import { motion } from 'framer-motion';
import SearchPetStore from 'stores/SearchPetStore';
import Card from 'components/common/Card';
import styles from './layout.module.scss';

interface Props {
  searchPetStore: SearchPetStore;
}

const PetsList: FC<Props> = ({ searchPetStore }) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={styles.cardLayout}
      transition={{ ease: 'easeOut', delay: 0.5 }}
    >
      {searchPetStore.pets.map((pet) => {
        return (
          <Card
            key={pet._id}
            petId={pet._id}
            name={pet.name}
            image={pet.image.filenames[0]}
          />
        );
      })}
    </motion.div>
  );
};

export default PetsList;
