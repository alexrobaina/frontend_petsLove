import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import styles from './dashboardCard.scss'

const DashboardCard = ({ icon, titleCard, total, handleClick }) => {
  return (
    <div onClick={handleClick} className={c(styles.cardContainar, !handleClick && styles.noButton)}>
      <div className={styles.card}>
        <div className={styles.containerText}>
          {icon ? (
            <>
              <div className={styles.title}>{titleCard}</div>
              <div className={styles.iconColor}>{icon}</div>
            </>
          ) : (
            <>
              <div className={styles.title}>{titleCard}</div>
              <div className={styles.number}>{total}</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

DashboardCard.propTypes = {
  handleClick: PropTypes.func,
  titleCard: PropTypes.string,
  total: PropTypes.number,
  icon: PropTypes.node,
}

DashboardCard.defaultProps = {
  handleClick: null,
  total: 0,
  titleCard: '',
  icon: null,
}

export default DashboardCard
