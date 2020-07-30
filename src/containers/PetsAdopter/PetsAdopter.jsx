import React, { useCallback, useState } from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import Title from 'components/commons/Title'
import PaginationList from 'components/commons/PaginationList'
import LayoutContainerCardsPets from 'components/commons/LayoutContainerCardsPets'
import ListPets from 'components/ListPets'
import Loading from 'components/commons/Loading'

const PetsAdopter = ({ store, id }) => {
  const [page, setPage] = useState(1)
  const [limit] = useState(5)
  const { t } = useTranslation('dashboard')

  const handleChangePage = useCallback((e, newPage) => {
    store.getPets(id, 5, newPage)
    setPage(newPage)
  }, [])

  return (
    <>
      <LayoutContainerCardsPets>
        <Title title={t('protectionistUser.petsAdopted')} />
      </LayoutContainerCardsPets>
      {store.isLoading ? (
        <Loading loadingRing />
      ) : (
        <>
          <ListPets isLoading={store.isLoading} pets={store.pets} />
          {store.totalPets !== 0 && (
            <PaginationList
              page={page}
              limit={limit}
              handleChange={handleChangePage}
              total={store.totalPets}
            />
          )}
        </>
      )}
    </>
  )
}

export default observer(PetsAdopter)
