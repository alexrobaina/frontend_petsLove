import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import styles from './label.scss'

const Label = ({ text }) => {
  return <div className={styles.label}>{text}</div>
}

Label.propTypes = {
  text: PropTypes.string,
}

Label.defaultProps = {
  text: '',
}

export default observer(Label)
