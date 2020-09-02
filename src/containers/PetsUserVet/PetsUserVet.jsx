import React, { useCallback, useContext, useEffect, useState } from 'react'
import UserContext from 'Context/UserContext'
import { observer } from 'mobx-react'
import { MdSearch } from 'react-icons/md'
import Title from 'components/commons/Title'
import Input from 'components/commons/Input'
import ContainerPetsCards from 'components/ContainerPetsCards'
import { useTranslation } from 'react-i18next'
import Loading from 'components/commons/Loading'
import PaginationList from 'components/commons/PaginationList'
import { LIMIT_LIST } from 'services/config'

const PetsUserVet = ({ id }) => {
  const { t } = useTranslation('dashboard')
  const [page, setPage] = useState(1)
  const [limit] = useState(LIMIT_LIST)
  const rootStore = useContext(UserContext)
  const { searchPetsStore } = rootStore

  useEffect(() => {
    searchPetsStore.getPetsUserVet(id, LIMIT_LIST, page, '')
  }, [])

  const handleChangePage = useCallback((e, newPage) => {
    searchPetsStore.getPetsUserVet(id, LIMIT_LIST, newPage, '')
    setPage(newPage)
  }, [])

  const handleSearch = useCallback(e => {
    searchPetsStore.getPetsUserVet(id, LIMIT_LIST, page, e.target.value)
  }, [])

  return (
    <>
      <Title mTop="50px" mBottom="30px" title={t('userVet.titlePetsList')} />
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
            pets={searchPetsStore.petsUserVet}
          />
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
