import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import styles from './linkNavbarUser.scss'

const LinkNavbarUser = ({ route, handleMenu }) => {
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
        <div className={c(text ? styles.text : styles.textNone)}>{route.text}</div>
      </button>
    </div>
  )
}

LinkNavbarUser.propTypes = {
  route: PropTypes.oneOfType([PropTypes.array]).isRequired,
  handleMenu: PropTypes.bool.isRequired,
}

export default LinkNavbarUser
