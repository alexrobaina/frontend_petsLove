import React, { useState } from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import Input from 'components/commons/Input'
import { MdClose, MdSend } from 'react-icons/md'
import Button from 'components/commons/Button'
import Textarea from 'components/commons/Textarea'
import styles from './modal.scss'

const Modal = ({ textButtonOpen, title, icon, text }) => {
  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    if (toggle === false) {
      setToggle(true)
    } else {
      setToggle(false)
    }
  }

  return (
    <>
      <Button icon={icon} circle text={textButtonOpen} handleClick={handleToggle} />
      <div className={c(styles.modalCard, toggle && styles.openModal)}>
        <div className={styles.title}>{title}</div>
        <div className={styles.text}>{text}</div>
        <div className={styles.form}>
          <div className={styles.inputForm}>
            <Input type="text" placeholder="Name" />
          </div>
          <div className={styles.inputForm}>
            <Input type="number" placeholder="Phone" />
          </div>
          <div className={styles.inputForm}>
            <Input type="email" placeholder="Email" />
          </div>
          <div className={styles.inputForm}>
            <Textarea placeholder="Message" cols="4" rows="6" />
          </div>
        </div>
        <div className={styles.containerButtonModals}>
          <Button icon={<MdSend size={25} />} text="Send Message" handleClick={handleToggle} />
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
}

export default Modal
