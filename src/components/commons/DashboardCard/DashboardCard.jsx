import React from 'react'
import PropTypes from 'prop-types'
import LayoutContainerCard from 'components/commons/LayoutContainerCard'
import styles from './dashboardCard.scss'

const DashboardCard = ({ icon, iconTwo, titleCard, totalPets, handleClick }) => {
  return (
    <LayoutContainerCard>
      <div onClick={handleClick} className={styles.cardContainar}>
        <div className={styles.card}>
          {iconTwo && <img className={styles.icon} src={iconTwo} alt="icons-images" />}
          <div className={styles.containerText}>
            <div className={styles.title}>{titleCard}</div>
            <div className={styles.number}>{totalPets}</div>
          </div>
          <img className={styles.icon} src={icon} alt="icons-images" />
        </div>
      </div>
    </LayoutContainerCard>
  )
}

DashboardCard.propTypes = {
  handleClick: PropTypes.func,
  titleCard: PropTypes.string,
  totalPets: PropTypes.number,
  icon: PropTypes.node,
  iconTwo: PropTypes.node,
}

DashboardCard.defaultProps = {
  handleClick: null,
  totalPets: 0,
  titleCard: '',
  icon: null,
  iconTwo: null,
}

export default DashboardCard
