import { FC } from "react";
import { motion } from "framer-motion";
import { MdDeleteForever } from "react-icons/md";

import BaseText from "../../../../components/common/BaseText";
import BaseTitle from "../../../../components/common/BaseTitle";
import BaseButton from "../../../../components/common/BaseButton";
import { VARIANTS_OPACITY } from "../../../../constants/animation";

import styles from "./MedicalNotesItem.module.scss";

interface Props {
  title: string;
  testId: string;
  description: string;
  handleDelete: Function;
}

const MedicalNotesItem: FC<Props> = ({
  title,
  testId,
  description,
  handleDelete,
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    data-testid={testId}
    variants={VARIANTS_OPACITY}
    className={styles.containerMedicalNotes}
    transition={{ ease: "easeOut", delay: 0.2 }}
  >
    <div>
      <BaseTitle size={20} title={title} />
      <BaseText text={description} />
    </div>
    <div>
      <BaseButton
        onClick={() => handleDelete(title)}
        icon={<MdDeleteForever size={25} />}
      />
    </div>
  </motion.div>
);

export default MedicalNotesItem;
