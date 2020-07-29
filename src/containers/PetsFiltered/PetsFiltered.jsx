import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import PaginationList from 'components/commons/PaginationList'
import FilterSearchPetsStore from 'stores/FilterSearchPetsStore'
import ListPets from 'components/ListPets'
import Loading from 'components/commons/Loading'

const PetsFiltered = ({ store }) => {
  const [page, setPage] = useState(1)
  const [limit] = useState(6)

  useEffect(() => {
    store.searchPets(6, page)
  }, [])

  const handleChangePage = useCallback((e, newPage) => {
    store.searchPets(6, newPage)
    setPage(newPage)
  }, [])

  return (
    <>
      {store.isLoading ? (
        <Loading loadingRing />
      ) : (
        <>
          <ListPets isLoading={store.isLoading} pets={store.petsFiltered} />
          {store.totalPetsFiltered !== 0 && (
            <PaginationList
              page={page}
              limit={limit}
              handleChange={handleChangePage}
              total={store.totalPetsFiltered}
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
