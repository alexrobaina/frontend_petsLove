import React from 'react'
import PropTypes from 'prop-types'
import { MdCancel } from 'react-icons/md'
import Chips from '../Chips'
import styles from './filterChips.scss'

const FilterChips = ({ filters, handleDelete }) => {
  return (
    <div className={styles.containerFilters}>
      {filters !== []
        ? filters.map(filter => {
            return (
              <Chips
                key={filter.text}
                handleChips={() => handleDelete(filter.text, filter.typeFilter)}
                text={filter.text}
                icon={<MdCancel size={16} />}
              />
            )
          })
        : ''}
    </div>
  )
}

FilterChips.propTypes = {
  filters: PropTypes.oneOfType([PropTypes.array]).isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default FilterChips
