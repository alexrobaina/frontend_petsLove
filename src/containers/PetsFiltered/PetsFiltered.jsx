import React, { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import PaginationList from 'components/commons/PaginationList'
import ListPets from 'components/ListPets'
import Loading from 'components/commons/Loading'

const PetsFiltered = ({ searchPetsStore }) => {
  const [page, setPage] = useState(1)
  const [limit] = useState(6)

  useEffect(() => {
    searchPetsStore.searchPets(6, page)
  }, [])

  const handleChangePage = useCallback((e, newPage) => {
    searchPetsStore.searchPets(6, newPage)
    setPage(newPage)
  }, [])

  return (
    <>
      {searchPetsStore.isLoading ? (
        <Loading loadingRing />
      ) : (
        <>
          <ListPets isLoading={searchPetsStore.isLoading} pets={searchPetsStore.petsFiltered} />
          {searchPetsStore.totalPetsFiltered !== 0 && (
            <PaginationList
              page={page}
              limit={limit}
              handleChange={handleChangePage}
              total={searchPetsStore.totalPetsFiltered}
            />
          )}
        </>
      )}
    </>
  )
}

export default observer(PetsFiltered)
