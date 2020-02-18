import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import Input from 'components/commons/Input'
import Button from 'components/commons/Button'
import styles from './modal.scss'
import Title from '../Title'
import Textarea from '../Textarea'

const Modal = ({ textButtonOpen, title }) => {
  const [toggle, setToggle] = useState(false)
  console.log(toggle)

  const handleToggle = () => {
    if (toggle === false) {
      return setToggle(true)
    }
    setToggle(false)
  }

  return (
    <>
      <Button bigButton text={textButtonOpen} handleSearch={handleToggle} />
      <div className={c(styles.modalCard, toggle && styles.openModal)}>
        <Title withMargin title={title} />
        <div className={styles.form}>
          <Input placeholder="Name" />
          <Textarea placeholder="Message" cols="4" rows="4" />
        </div>
        <div className={styles.containerButtonModals}>
          <Button text="Close" handleSearch={handleToggle} />
          <Button text="Send Message" handleSearch={handleToggle} />
        </div>
      </div>
      <div onClick={handleToggle} className={c(toggle === true ? styles.shadow : styles.displayNone)} />
    </>
  )
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Modal
