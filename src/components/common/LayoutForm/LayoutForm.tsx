import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import { VARIANTS_OPACITY } from "../../../constants/animation";
import styles from "./LayoutForm.module.scss";

interface Props {
  children?: ReactNode;
  submitForm?: any;
}

const LayoutForm: FC<Props> = ({ children, submitForm }) => {
  return (
    <motion.form
      initial="hidden"
      animate="visible"
      onSubmit={submitForm}
      className={styles.layout}
      variants={VARIANTS_OPACITY}
      transition={{ ease: "easeOut", delay: 0.2 }}
    >
      {children}
    </motion.form>
  );
};

export default LayoutForm;
