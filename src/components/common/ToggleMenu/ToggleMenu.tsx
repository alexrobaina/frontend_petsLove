import { FC, ReactElement } from "react";
import { motion } from "framer-motion";
import { VARIANTS_OPACITY } from "../../../constants/animation";
import styles from "./ToggleMenu.module.scss";

interface Props {
  children?: ReactElement;
  isOpen: boolean;
}

const ToggleMenu: FC<Props> = ({ children, isOpen }) => {
  const open = isOpen ? "flex" : "none";
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={VARIANTS_OPACITY}
      className={styles.toggleMenu}
      style={{ marginTop: "50px", display: open }}
      transition={{ ease: "easeOut", delay: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default ToggleMenu;
