import React from 'react'
// import PropTypes from 'prop-types'
import DashboardCard from 'components/commons/DashboardCard'
// import ListPets from 'components/ListPets'
import LayoutContainer from 'components/commons/LayoutContainer'
import icon from '../businessman.svg'
import styles from '../dashboard.scss'

const TransitUser = () => {
  return (
    <LayoutContainer>
      <div className={styles.container}>
        <DashboardCard icon={icon} titleCard="transit" />
        <DashboardCard icon={icon} titleCard="transit" />
      </div>
      {/* <ListPets pets={searchPetsStore.pets} /> */}
    </LayoutContainer>
  )
}

TransitUser.propTypes = {}

export default TransitUser
