import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import styles from './input.scss'

const Input = ({type, handleChange}) => {
  return (
    <Fragment>
      <input
        className={styles.input}
        type={type}
        onChange={handleChange}
      />
    </Fragment>
  )
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default Input