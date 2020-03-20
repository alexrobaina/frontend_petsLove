import React, { useState } from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { MdClose } from 'react-icons/md'
import Button from 'components/commons/Button'
import ErrorIcon from 'components/commons/ErrorIcon'
import SuccessIcon from 'components/commons/SuccessIcon'
import styles from './modal.scss'

const Modal = ({ title, text, error }) => {
  const [toggle, setToggle] = useState(true)

  const handleToggle = () => {
    if (toggle === false) {
      setToggle(true)
    } else {
      setToggle(false)
    }
  }

  return (
    <>
      <div className={c(styles.modalCard, toggle && styles.openModal)}>
        {error ? <ErrorIcon /> : <SuccessIcon />}
        <div className={styles.contentModals}>
          <div className={styles.title}>{title}</div>
          <div className={styles.text}>{text}</div>
        </div>
        <div className={styles.containerButtonModals}>
          <Button icon={<MdClose size={25} />} text="Close" handleClick={handleToggle} />
        </div>
      </div>
      <div
        onClick={handleToggle}
        className={c(toggle === true ? styles.shadow : styles.displayNone)}
      />
    </>
  )
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  error: PropTypes.bool,
}

Modal.defaultProps = {
  error: false,
}

export default Modal
