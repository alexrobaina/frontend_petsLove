import React from 'react'
// import PropTypes from 'prop-types'
import Navbar from 'components/commons/Navbar/Navbar'
import LayoutContainer from 'components/commons/LayoutContainer'
import styles from './transitUser.scss'

const TransitUser = () => {
  return (
    <Navbar>
      <div className={styles.containerTransit}>
        <LayoutContainer>transit User</LayoutContainer>
      </div>
    </Navbar>
  )
}

// TransitUser.propTypes = {}

export default TransitUser
