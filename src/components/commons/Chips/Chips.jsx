import React from 'react'
import PropTypes from 'prop-types'
import styles from './chips.scss'

const Chips = ({ handleChips, icon, text }) => {
  return (
    <div onClick={handleChips} className={styles.filter}>
      {text}
      <span className={styles.icons}>{icon}</span>
    </div>
  )
}

Chips.propTypes = {
  handleChips: PropTypes.func,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
}

Chips.defaultProps = {
  handleChips: null,
}

export default Chips
