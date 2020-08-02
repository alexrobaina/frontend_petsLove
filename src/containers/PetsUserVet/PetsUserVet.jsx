import React, { useCallback, useContext, useEffect, useState } from 'react'
import UserContext from 'Context/UserContext'
import { observer } from 'mobx-react'
import Title from 'components/commons/Title'
import ListPets from 'components/ListPets'
import { useTranslation } from 'react-i18next'
import Loading from 'components/commons/Loading'
import PaginationList from 'components/commons/PaginationList'

const PetsUserVet = ({ id }) => {
  const { t } = useTranslation('dashboard')
  const [page, setPage] = useState(1)
  const [limit] = useState(5)
  const rootStore = useContext(UserContext)
  const { searchPetsStore } = rootStore

  useEffect(() => {
    searchPetsStore.getPetsUserVet(id, 5, page)
  }, [])

  const handleChangePage = useCallback((e, newPage) => {
    searchPetsStore.getPetsUserVet(id, 5, newPage)
    setPage(newPage)
  }, [])

  return (
    <>
      <Title mTop="50px" mBottom="30px" title={t('userVet.titlePetsList')} />
      {searchPetsStore.isLoading ? (
        <Loading loadingRing />
      ) : (
        <>
          <ListPets isLoading={searchPetsStore.isLoading} pets={searchPetsStore.petsUserVet} />
          {searchPetsStore.totalPetsVet !== 0 && (
            <PaginationList
              page={page}
              limit={limit}
              handleChange={handleChangePage}
              total={searchPetsStore.totalPetsVet}
            />
          )}
        </>
      )}
    </>
  )
}

export default observer(PetsUserVet)
