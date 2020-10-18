import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import styles from './dashboardCard.scss'

const DashboardCard = ({ icon, titleCard, total, handleClick, isSelected }) => {
  return (
    <div
      onClick={handleClick}
      className={c(
        styles.cardContainar,
        !handleClick && styles.noButton,
        isSelected && styles.isSelected
      )}
    >
      <div className={styles.card}>
        <div className={styles.containerText}>
          {icon ? (
            <>
              <div className={styles.title}>{titleCard}</div>
              <div className={styles.iconColor}>{icon}</div>
            </>
          ) : (
            <>
              <div className={c(styles.title, isSelected && styles.isSelected)}>{titleCard}</div>
              <div className={c(styles.number, isSelected && styles.isSelected)}>{total}</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

DashboardCard.propTypes = {
  icon: PropTypes.node,
  titleCard: PropTypes.string,
  handleClick: PropTypes.func,
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

DashboardCard.defaultProps = {
  handleClick: null,
  total: 0,
  titleCard: '',
  icon: null,
}

export default DashboardCard
