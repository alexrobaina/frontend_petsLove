import { motion } from 'framer-motion'
import { FC, ReactNode } from 'react'
import Modal from 'react-modal'

import { IconClose } from '../../../assets/icons'
import useScreenWidth from '../../../hooks/ui/useScreenWidth'

interface Props {
  title?: string | ReactNode
  isOpen: boolean
  children: ReactNode
  description?: string
  buttonClose?: boolean
  width?: string | number
  height?: string | number
  closeModal?: () => void
}
export const ReactModal: FC<Props> = ({
  title,
  height,
  isOpen,
  children,
  closeModal,
  description,
  buttonClose = false,
}) => {
  const isScreenSmall = useScreenWidth(780)

  const makeDinamicWidth = () => {
    if (isScreenSmall) {
      return '95%'
    }
    return '450px'
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      border: 'none',
      height: height,
      marginRight: '-50%',
      borderRadius: '4px',
      width: makeDinamicWidth(),
      backgroundColor: '#f3faf8',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      zIndex: 20,
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
        className="flex flex-col md:p-2"
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h2 className="text-primary-950 font-medium">{title}</h2>
            <p className="text-gray-500">{description}</p>
          </div>
          {buttonClose && (
            <div
              role="button"
              onClick={closeModal}
              className="text-primary-950"
            >
              <IconClose />
            </div>
          )}
        </div>
        <div className="flex flex-col h-full">{children}</div>
      </motion.div>
    </Modal>
  )
}
