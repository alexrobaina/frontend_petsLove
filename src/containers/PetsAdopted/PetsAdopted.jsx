import React from 'react'
// import PropTypes from 'prop-types'
import Navbar from 'components/commons/Navbar/Navbar'
import LayoutContainer from 'components/commons/LayoutContainer'
import styles from './petsAdopted.scss'

const PetsAdopted = () => {
  return (
    <Navbar>
      <LayoutContainer>
        <div className={styles.container}>PetsAdopted</div>
      </LayoutContainer>
    </Navbar>
  )
}

// PetsAdopted.propTypes = {}

export default PetsAdopted
