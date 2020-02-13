import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { MdSearch } from 'react-icons/md'
import styles from './button.scss'

const Button = ({ handleSearch, text, circle, bigButton }) => {
  if (circle) {
    return (
      <button className={styles.btnCircle} type="button" onClick={handleSearch}>
        <MdSearch size={18} />
      </button>
    )
  }
  return (
    <button
      className={c(styles.primary, bigButton && styles.bigButton)}
      type="button"
      onClick={handleSearch}
    >
      {text}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  circle: PropTypes.bool,
}

Button.defaultProps = {
  circle: false,
}

export default Button
