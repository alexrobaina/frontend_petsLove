import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import c from 'classnames'
import styles from './linkNavbarUser.scss'

const LinkNavbarUser = ({ route, handleMenu }) => {
  const { t } = useTranslation('navbar')
  const [text, setText] = useState(false)

  const handleMouseUp = useCallback(() => {
    setText(true)
  }, [])

  const handleMouseOut = useCallback(() => {
    setText(false)
  }, [])

  return (
    <div className={styles.containerMenuLink}>
      <button
        onClick={() => handleMenu(route.link)}
        onMouseOver={handleMouseUp}
        onMouseOut={handleMouseOut}
        className={styles.btnCircle}
        type="button"
      >
        <div className={styles.icon}>{route.icon}</div>
        <div className={c(text ? styles.text : styles.textNone)}>{t(route.text)}</div>
      </button>
    </div>
  )
}

LinkNavbarUser.propTypes = {
  route: PropTypes.objectOf(PropTypes.any).isRequired,
  handleMenu: PropTypes.func.isRequired,
}

export default LinkNavbarUser
