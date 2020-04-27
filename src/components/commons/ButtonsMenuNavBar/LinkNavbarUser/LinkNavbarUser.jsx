import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import c from 'classnames'
import styles from './linkNavbarUser.scss'

const LinkNavbarUser = ({ link, handleMenu, icon, text }) => {
  const { t } = useTranslation('navbar')
  const [textView, setTextView] = useState(false)

  const handleMouseUp = useCallback(() => {
    setTextView(true)
  }, [])

  const handleMouseOut = useCallback(() => {
    setTextView(false)
  }, [])

  return (
    <div className={styles.containerMenuLink}>
      <button
        onClick={() => handleMenu(link)}
        onMouseOver={handleMouseUp}
        onMouseOut={handleMouseOut}
        className={styles.btnCircle}
        type="button"
      >
        <div className={styles.icon}>{icon}</div>
        <div className={c(textView ? styles.text : styles.textNone)}>{t(text)}</div>
      </button>
    </div>
  )
}

LinkNavbarUser.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  handleMenu: PropTypes.func.isRequired,
}

export default LinkNavbarUser
