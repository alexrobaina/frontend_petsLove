import React from 'react'
import PropTypes from 'prop-types'
import styles from './viewValue.scss'

const ViewValue = ({ placeholder, value }) => {
  return (
    <>
      <label className={styles.label}>{placeholder}</label>
      {value ? <div className={styles.value}>{value}</div> : <div className={styles.value}>-</div>}
    </>
  )
}

ViewValue.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default ViewValue
