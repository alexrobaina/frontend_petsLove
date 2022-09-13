import { VARIANTS_OPACITY } from "constants/animation";
import { motion } from "framer-motion";
import { FC, ReactElement } from "react";

import styles from "./Card.module.scss";

interface Props {
  width?: number;
  padding?: string;
  children: ReactElement;
}

const Card: FC<Props> = ({ children, width, padding }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      style={{ width, padding }}
      variants={VARIANTS_OPACITY}
      className={styles.cardContainar}
      transition={{ ease: "easeOut", delay: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
