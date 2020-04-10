import React from 'react'
import PropTypes from 'prop-types'
import LayoutContainerCard from 'components/commons/LayoutContainerCard'
import styles from './dashboardCard.scss'

const DashboardCard = ({ icon, titleCard, numberCard }) => {
  return (
    <LayoutContainerCard>
      <div className={styles.cardContainar}>
        <div className={styles.card}>
          <div className={styles.containerText}>
            <div className={styles.title}>{titleCard}</div>
            <div className={styles.number}>{numberCard}</div>
          </div>
          <img className={styles.icon} src={icon} alt="icons-images" />
        </div>
      </div>
    </LayoutContainerCard>
  )
}

DashboardCard.propTypes = {
  titleCard: PropTypes.string.isRequired,
  numberCard: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
}

export default DashboardCard
