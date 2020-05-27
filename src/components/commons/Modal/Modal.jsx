import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { Animated } from 'react-animated-css'
import { MdSave } from 'react-icons/md'
import Button from 'components/commons/Button'
import ErrorIcon from 'components/commons/ErrorIcon'
import SuccessIcon from 'components/commons/SuccessIcon'
import styles from './modal.scss'

const Modal = ({
  openModal,
  title,
  text,
  error,
  isIcon,
  children,
  handleSendMessage,
  handleToggle,
}) => {
  return (
    <>
      <div className={c(styles.modalCard, openModal && styles.openModal)}>
        <Animated
          isVisible
          animationOut="fadeInUp"
          animationInDuration={500}
          animationIn="bounceInDown"
        >
          {isIcon && <>{error ? <ErrorIcon /> : <SuccessIcon />}</>}
          <div className={styles.contentModals}>
            <div className={styles.title}>{title}</div>
            <div className={styles.text}>{text}</div>
          </div>
          {children}
          <div className={styles.containerButtonModals}>
            <Button icon={<MdSave size={25} />} text="Ok" handleClick={handleSendMessage} />
          </div>
        </Animated>
      </div>
      <div
        onClick={handleToggle}
        className={c(openModal === true ? styles.shadow : styles.displayNone)}
      />
    </>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  error: PropTypes.bool,
  isIcon: PropTypes.bool,
}

Modal.defaultProps = {
  text: '',
  error: false,
  isIcon: false,
  children: null,
}

export default Modal
