import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import PaginationList from 'components/commons/PaginationList'
import FilterSearchPetsStore from 'stores/FilterSearchPetsStore'
import ContainerPetsCards from 'components/ContainerPetsCards'
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
          <ContainerPetsCards isLoading={store.isLoading} pets={store.petsFiltered} />
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
