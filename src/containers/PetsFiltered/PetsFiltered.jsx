import React, { useCallback, useContext, useEffect, useState } from 'react'
import UserContext from 'Context/UserContext'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import Title from 'components/commons/Title'
import PaginationList from 'components/commons/PaginationList'
import LayoutContainerCardsPets from 'components/commons/LayoutContainerCardsPets'
import ListPets from 'components/ListPets'
import Loading from 'components/commons/Loading'

const PetsFiltered = ({ searchPetsStore }) => {
  const [page, setPage] = useState(1)
  const [limit] = useState(6)
  const { t } = useTranslation('dashboard')

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
          {searchPetsStore.totalPetsFiltered && (
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
