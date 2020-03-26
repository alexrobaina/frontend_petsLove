import React from 'react'
import PropTypes from 'prop-types'
import styles from './buttonLink.scss'

const ButtonLink = ({ onclick, text }) => {
  return (
    <div onClick={onclick} className={styles.textLink}>
      {text}
    </div>
  )
}

ButtonLink.propTypes = {
  text: PropTypes.string.isRequired,
  onclick: PropTypes.func.isRequired,
}

export default ButtonLink
