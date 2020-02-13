import React from 'react'
import PropTypes from 'prop-types'
import styles from './layoutContainer.scss'

const LayoutContainer = ({ children }) => <div className={styles.containerLayout}>{children}</div>

LayoutContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutContainer
