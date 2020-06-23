import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import c from 'classnames'
import styles from './linkNavbarUser.scss'

const LinkNavbarUser = ({ link, handleMenu, icon, text, id, haveId = false }) => {
  const { t } = useTranslation('navbar')
  const [textView, setTextView] = useState(false)

  const handleMouseUp = useCallback(() => {
    setTextView(true)
  }, [])

  const handleMouseOut = useCallback(() => {
    setTextView(false)
  }, [])

  const handleMenuClick = useCallback(() => {
    handleMenu(link, id, haveId)
  }, [])

  return (
    <div className={styles.containerMenuLink}>
      <button
        type="button"
        onClick={handleMenuClick}
        onMouseOver={handleMouseUp}
        onMouseOut={handleMouseOut}
        className={styles.btnCircle}
      >
        <div className={styles.icon}>{icon}</div>
        <div className={c(textView ? styles.text : styles.textNone)}>{t(text)}</div>
      </button>
    </div>
  )
}

LinkNavbarUser.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  handleMenu: PropTypes.func.isRequired,
}

export default LinkNavbarUser
