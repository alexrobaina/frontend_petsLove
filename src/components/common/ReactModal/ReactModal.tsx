import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import styles from "./ReactModal.module.scss";
import { IoMdClose } from "react-icons/io";

interface Props {
  title?: string;
  children: ReactNode;
  isOpen: boolean;
  closeModal?: () => void;
}

const ReactModal: FC<Props> = ({ title, children, closeModal, isOpen }) => {
  let backgroundColor;
  let closeButtonColor;
  if (typeof window !== "undefined") {
    backgroundColor = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--modal-background");
    closeButtonColor = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--primary-color-text");
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "20px",
      border: "none",
      backgroundColor,
    },
    overlay: {
      zIndex: 100,
      background: "rgba(0,0,0,0.5)",
    },
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className={styles.layout}
        transition={{ ease: "easeOut" }}
      >
        <div className={styles.modalContainer}>
          <div className={styles.header}>
            <div className={styles.title}>{title}</div>
            {closeModal && (
              <div className={styles.close} role="button" onClick={closeModal}>
                <IoMdClose size={22} />
              </div>
            )}
          </div>
          <div className={styles.children}>{children}</div>
        </div>
      </motion.div>
    </Modal>
  );
};

export default ReactModal;
