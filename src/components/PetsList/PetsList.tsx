import { FC } from "react";
import { motion } from "framer-motion";
import BaseErrorMessage from "components/common/BaseErrorMessage";
import BaseLoading from "components/common/BaseLoading";
import PetCard from "components/PetCard";

import styles from "./PetsList.module.scss";

interface Props {
  pets: any;
  isLoading: boolean;
}

const PetsList: FC<Props> = ({ pets, isLoading }) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
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
        transition={{ ease: "easeOut", delay: 0.5 }}
      >
        {pets &&
          pets.map((pet: any) => {
            return (
              <PetCard
                key={pet.id}
                petId={pet.id}
                name={pet.name}
                image={pet.images}
              />
            );
          })}
      </motion.div>
      {pets?.length === 0 && (
        <BaseErrorMessage text="No encontramos mascotas" />
      )}
    </>
  );
};

export default PetsList;
