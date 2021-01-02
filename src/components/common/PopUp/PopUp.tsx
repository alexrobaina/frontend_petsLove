import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { GrClose } from 'react-icons/gr';
import Modal from 'react-modal';
import styles from './popUp.module.scss';

interface Props {
  title: string;
  children: ReactNode;
  modalIsOpen: boolean;
  closeModal?(): void;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    bakgroundColor: 'white',
  },
  overlay: {
    background: 'rgba(0,0,0,0.5)',
  },
};

const PopUp: FC<Props> = ({ title, children, closeModal, modalIsOpen }) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className={styles.layout}
          transition={{ ease: 'easeOut' }}
        >
          <div className={styles.modalContainer}>
            <div className={styles.header}>
              <div className={styles.title}>{title}</div>
              <div className={styles.close} role="button" onClick={closeModal}>
                <GrClose size={20} />
              </div>
            </div>
            <div className={styles.children}>{children}</div>
          </div>
        </motion.div>
      </Modal>
    </>
  );
};

export default PopUp;
