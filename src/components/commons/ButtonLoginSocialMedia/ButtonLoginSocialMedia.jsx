import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import styles from './buttonLoginSocialMedia.scss'

const ButtonLoginSocialMedia = ({ socialButton, textButton }) => (
  <button
    type="button"
    className={c(
      styles.btn,
      socialButton === 'google' && styles.googleLogin,
      socialButton === 'facebook' && styles.facebookLogin
    )}
  >
    {textButton}
  </button>
)

ButtonLoginSocialMedia.propTypes = {
  socialButton: PropTypes.string.isRequired,
  textButton: PropTypes.string.isRequired,
}

export default ButtonLoginSocialMedia
