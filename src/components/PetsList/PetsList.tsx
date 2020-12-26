import { useState, FC } from 'react';
import { motion } from 'framer-motion';
import SearchPetStore from 'stores/SearchPetStore';
import Card from 'components/common/Card';
import styles from './layout.module.scss';
import PaginationList from 'components/common/PaginationList';

interface Props {
  searchPetStore: SearchPetStore;
}

const PetsList: FC<Props> = ({ searchPetStore }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const handlePage = () => {
    console.log('====================================');
    console.log('hola');
    console.log('====================================');
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
