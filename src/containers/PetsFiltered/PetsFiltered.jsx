import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import ListPets from 'containers/ListPets'
import FilterSearchPetsStore from 'stores/FilterSearchPetsStore'
import PaginationList from 'components/commons/PaginationList'
import Loading from 'components/commons/Loading'
import { LIMIT_LIST } from 'services/config'

const PetsFiltered = ({ store }) => {
  const [page, setPage] = useState(1)
  const [limit] = useState(LIMIT_LIST)

  useEffect(() => {
    store.searchPets(LIMIT_LIST, page)
  }, [])

  const handleChangePage = useCallback((e, newPage) => {
    store.searchPets(LIMIT_LIST, newPage)
    setPage(newPage)
  }, [])

  return (
    <>
      {store.isLoading ? (
        <Loading loadingRing />
      ) : (
        <>
          {store.totalPetsFiltered !== 0 && (
            <ListPets
              page={page}
              limit={limit}
              listPets={store.petsFiltered}
              totalPets={store.totalPetsFiltered}
              handleChangePage={handleChangePage}
            />
          )}
        </>
      )}
    </>
  )
}

PetsFiltered.propTypes = {
  store: PropTypes.instanceOf(FilterSearchPetsStore).isRequired,
}

export default observer(PetsFiltered)
