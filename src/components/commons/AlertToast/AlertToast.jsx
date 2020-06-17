import React from 'react'
import PropTypes from 'prop-types'
import { ToastContainer } from 'react-toastify'

import styles from './alertToast.scss'
import { IoMdClose } from 'react-icons/io'

const CloseButton = ({ closeToast }) => (
  <i className={styles.closeButton} onClick={closeToast}>
    <IoMdClose size={15} />
  </i>
)

const AlertToast = ({}) => {
  return <ToastContainer draggable={true} closeButton={CloseButton} />
}

AlertToast.propTypes = {}

export default AlertToast
