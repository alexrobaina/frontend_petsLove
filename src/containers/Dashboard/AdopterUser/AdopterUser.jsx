import React from 'react'
// import PropTypes from 'prop-types'
import DashboardCard from 'components/commons/DashboardCard'
import LayoutContainer from 'components/commons/LayoutContainer'
// import ListPets from 'components/ListPets'
import icon from '../businessman.svg'
import styles from '../dashboard.scss'

const AdopterUser = () => {
  return (
    <LayoutContainer>
      <div className={styles.container}>
        <DashboardCard icon={icon} titleCard="adopter" />
        <DashboardCard icon={icon} titleCard="adopter" />
      </div>
      {/* <ListPets /> */}
    </LayoutContainer>
  )
}

// AdopterUser.propTypes = {}

export default AdopterUser
