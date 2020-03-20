import React from 'react'
import c from 'classnames'
import styles from './errorIcon.scss'

const ErrorIcon = () => {
  return (
    <div className={c(styles.sweetIcon, styles.sweetError)}>
      <span className={c(styles.xMark)}>
        <span className={c(styles.line, styles.left)} />
        <span className={c(styles.line, styles.right)} />
      </span>
    </div>
  )
}

export default ErrorIcon
