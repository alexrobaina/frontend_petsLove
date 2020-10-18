import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { IoMdClose } from 'react-icons/io'
import c from 'classnames'
import styles from './alertToast.scss'

const AlertToast = ({ toggleToast, handleToggleToast, text, warning }) => {
  useEffect(() => {
    if (toggleToast) {
      setTimeout(() => {
        handleToggleToast(false)
      }, 4000)
    }
  }, [toggleToast])

  return (
    <div
      onClick={() => handleToggleToast(false)}
      className={c(styles.container, toggleToast && styles.toast, warning && styles.warning)}
    >
      <div className={styles.containerIconClose}>
        <IoMdClose size={20} />
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  )
}

AlertToast.proptype = {
  handleToggleToast: PropTypes.func.isRequired,
  toggleToast: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  warning: PropTypes.bool,
}

AlertToast.defaultProps = {
  warning: false,
}

export default observer(AlertToast)
