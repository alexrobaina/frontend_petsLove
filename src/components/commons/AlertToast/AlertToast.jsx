import React from 'react'
import { ToastContainer } from 'react-toastify'
import { IoMdClose } from 'react-icons/io'
import styles from './alertToast.scss'

const CloseButton = ({ closeToast }) => (
  <i className={styles.closeButton} onClick={closeToast}>
    <IoMdClose size={15} />
  </i>
)

const AlertToast = () => {
  return <ToastContainer className={styles.toast} draggable closeButton={CloseButton} />
}

export default AlertToast
