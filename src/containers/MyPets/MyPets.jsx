import React from 'react'
// import PropTypes from 'prop-types'
import LayoutContainer from 'components/commons/LayoutContainer'
import Navbar from 'components/commons/Navbar/Navbar'
import styles from './myPets.scss'

const MyPets = () => {
  return (
    <Navbar>
      <LayoutContainer>
        <div className={styles.container}>my Pets</div>
      </LayoutContainer>
    </Navbar>
  )
}

// MyPets.propTypes = {}

export default MyPets
