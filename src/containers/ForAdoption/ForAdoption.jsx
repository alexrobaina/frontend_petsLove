import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react'
import UserContext from 'Context/UserContext'
import { useTranslation } from 'react-i18next'
import LayoutContainerCardsPets from 'components/commons/LayoutContainerCardsPets'
import ListPets from 'components/ListPets'
import Title from 'components/commons/Title'
import Loading from 'components/commons/Loading'

const ForAdoption = ({ id }) => {
  const { t } = useTranslation('dashboard')
  const rootStore = useContext(UserContext)
  const { searchPetsStore } = rootStore

  useEffect(() => {
    searchPetsStore.getPetsForAdoption(id)
  }, [])
  
  return (
    <>
      <LayoutContainerCardsPets>
        <Title title={t('protectionistUser.needHome')} />
      </LayoutContainerCardsPets>
      {searchPetsStore.isLoading ? (
        <Loading loadingRing />
      ) : (
        <ListPets pets={searchPetsStore.petsForAdoption} />
      )}
    </>
  )
}

export default observer(ForAdoption)
