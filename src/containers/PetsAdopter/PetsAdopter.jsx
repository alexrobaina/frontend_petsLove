import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Title from 'components/commons/Title'
import PaginationList from 'components/commons/PaginationList'
import ListPets from 'components/ListPets'
import Loading from 'components/commons/Loading'

const PetsAdopter = ({ store, id, title }) => {
  const [page, setPage] = useState(1)
  const [limit] = useState(5)

  const handleChangePage = useCallback((e, newPage) => {
    store.getPets(id, 5, newPage)
    setPage(newPage)
  }, [])

  return (
    <>
      <Title mTop="50px" mBottom="30px" title={title} />
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

PetsAdopter.prototype = {
  title: PropTypes.string,
}

PetsAdopter.defaultProps = {
  title: '',
}

export default observer(PetsAdopter)
