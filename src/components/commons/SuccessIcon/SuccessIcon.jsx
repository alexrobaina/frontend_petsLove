import React from 'react'
import c from 'classnames'
import styles from './successIcon.scss'

const SuccessIcon = () => {
  return (
    <div className={c(styles.sweetIcon, styles.sweetSuccess)}>
      <span className={c(styles.line, styles.tip)} />
      <span className={c(styles.line, styles.long)} />
      <div className={styles.placeholder} />
      <div className={styles.fix} />
    </div>
  )
}

export default SuccessIcon
