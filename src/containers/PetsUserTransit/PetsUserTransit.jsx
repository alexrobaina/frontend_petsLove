import React, { useCallback, useContext, useEffect, useState } from 'react'
import UserContext from 'Context/UserContext'
import { useTranslation } from 'react-i18next'
import { MdSearch } from 'react-icons/md'
import { observer } from 'mobx-react'
import Title from 'components/commons/Title'
import ContainerPetsCards from 'components/ContainerPetsCards'
import Input from 'components/commons/Input'
import Loading from 'components/commons/Loading'
import PaginationList from 'components/commons/PaginationList'
import { LIMIT_LIST } from 'services/config'

const PetsUserTransit = ({ id }) => {
  const { t } = useTranslation('dashboard')
  const [page, setPage] = useState(1)
  const [limit] = useState(LIMIT_LIST)
  const rootStore = useContext(UserContext)
  const { searchPetsStore } = rootStore

  useEffect(() => {
    searchPetsStore.getPetsUserTransit(id, LIMIT_LIST, page)
  }, [])

  const handleChangePage = useCallback((e, newPage) => {
    searchPetsStore.getPetsUserTransit(id, LIMIT_LIST, newPage)
    setPage(newPage)
  }, [])

  const handleSearch = useCallback(e => {
    searchPetsStore.getPetsUserTransit(id, LIMIT_LIST, page, e.target.value)
  }, [])

  return (
    <>
      <Title mTop="50px" mBottom="30px" title={t('transitUser.titlePetsList')} />
      <Input
        isEdit
        handleChange={handleSearch}
        icon={<MdSearch size={20} />}
        placeholder={t('common:filterForName')}
      />
      {searchPetsStore.isLoading ? (
        <Loading loadingRing />
      ) : (
        <>
          <ContainerPetsCards
            isLoading={searchPetsStore.isLoading}
            pets={searchPetsStore.petsUserTransit}
          />
          {searchPetsStore.totalPetsTransit !== 0 && (
            <PaginationList
              page={page}
              limit={limit}
              handleChange={handleChangePage}
              total={searchPetsStore.totalPetsTransit}
            />
          )}
        </>
      )}
    </>
  )
}

export default observer(PetsUserTransit)
