import React from 'react'
import PropTypes from 'prop-types'
import styles from './buttonIcon.scss'

const ButtonIcon = ({ onclick, icon }) => {
  return (
    <div className={styles.iconFilter} onClick={onclick}>
      {icon}
    </div>
  )
}

ButtonIcon.propTypes = {
  onclick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
}

export default ButtonIcon
