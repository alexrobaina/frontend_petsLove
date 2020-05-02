import React, { useState } from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { Animated } from 'react-animated-css'
import { MdClose, MdSave } from 'react-icons/md'
import Button from 'components/commons/Button'
import ErrorIcon from 'components/commons/ErrorIcon'
import SuccessIcon from 'components/commons/SuccessIcon'
import styles from './modal.scss'

const Modal = ({ title, text, error, isIcon, children }) => {
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
        <Animated
          animationIn="bounceInDown"
          animationOut="fadeInUp"
          isVisible="true"
          animationInDuration={500}
        >
          {isIcon && <>{error ? <ErrorIcon /> : <SuccessIcon />}</>}
          <div className={styles.contentModals}>
            <div className={styles.title}>{title}</div>
            <div className={styles.text}>{text}</div>
          </div>
          {children}
          <div className={styles.containerButtonModals}>
            <Button icon={<MdSave size={25} />} text="Save" handleClick={handleToggle} />
            <Button icon={<MdClose size={25} />} text="Close" handleClick={handleToggle} />
          </div>
        </Animated>
      </div>
      <div
        onClick={handleToggle}
        className={c(toggle === true ? styles.shadow : styles.displayNone)}
      />
    </>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  error: PropTypes.bool,
  isIcon: PropTypes.bool,
}

Modal.defaultProps = {
  error: false,
  isIcon: false,
  children: null,
}

export default Modal
