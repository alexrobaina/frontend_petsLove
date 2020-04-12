import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import styles from './chips.scss'

const Chips = ({ isAdopted, handleChips, icon, text }) => {
  return (
    <>
      <div onClick={handleChips} className={c(isAdopted ? styles.isAdopted : styles.filter)}>
        {text}
        {icon && <span className={styles.icons}>{icon}</span>}
      </div>
    </>
  )
}

Chips.propTypes = {
  isAdopted: PropTypes.bool,
  handleChips: PropTypes.func,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
}

Chips.defaultProps = {
  isAdopted: false,
  handleChips: null,
}

export default Chips
