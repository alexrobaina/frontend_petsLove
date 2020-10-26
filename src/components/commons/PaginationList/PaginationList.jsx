import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Pagination from '@material-ui/lab/Pagination'
import styles from './paginationList.scss'

const PaginationList = ({ handleChange, page, total, limit }) => {
  const [numberPage, setNumberPage] = useState(0)

  useEffect(() => {
    const result = total / limit
    setNumberPage(Math.ceil(result, 1))
  }, [total])

  if (numberPage === 1) return null;

  return (
    <div className={styles.containerPagination}>
      <div className={styles.pagination}>
        <Pagination page={page} color="secondary" count={numberPage} onChange={handleChange} />
      </div>
    </div>
  )
}

PaginationList.propTypes = {
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default observer(PaginationList)
