import { motion } from 'framer-motion'
import { FC, ReactNode } from 'react'
import Modal from 'react-modal'

import useScreenWidth from '../../hooks/useScreenWidth'

interface Props {
  title?: string
  isOpen: boolean
  children: ReactNode
  buttonClose?: boolean
  width?: string | number
  height?: string | number
  closeModal?: () => void
}

export const ReactModal: FC<Props> = ({
  title,
  height,
  width,
  isOpen,
  children,
  closeModal,
  buttonClose = false,
}) => {
  const isScreenSmall = useScreenWidth(780)

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      border: 'none',
      marginRight: '-50%',
      borderRadius: '4px',
      width: width || isScreenSmall ? '95%' : '50%',
      height: height,
      backgroundColor: '#f3faf8',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      zIndex: 100,
      background: 'rgba(0,0,0,0.7)',
    },
  }

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      style={customStyles}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ ease: 'easeOut' }}
        className="flex flex-col md:p-4"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-primary-950 font-medium">{title}</h2>
          {buttonClose && (
            <div
              className="text-primary-950"
              role="button"
              onClick={closeModal}
            ></div>
          )}
        </div>
        <div className="flex flex-col h-full">{children}</div>
      </motion.div>
    </Modal>
  )
}
