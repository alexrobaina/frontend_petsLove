import React, { useContext, useEffect } from 'react'
import UserContext from 'Context/UserContext'
import { observer } from 'mobx-react'
import Title from 'components/commons/Title'
import LayoutContainerCardsPets from 'components/commons/LayoutContainerCardsPets'
import ListPets from 'components/ListPets'
import { useTranslation } from 'react-i18next'
import Loading from '../../components/commons/Loading'

const PetsAdopted = ({ id }) => {
  const { t } = useTranslation('dashboard')
  const rootStore = useContext(UserContext)
  const { searchPetsStore } = rootStore

  useEffect(() => {
    searchPetsStore.getPetAdopted(id)
  }, [])
  
  return (
    <>
      <LayoutContainerCardsPets>
        <Title title={t('protectionistUser.petsAdopted')} />
      </LayoutContainerCardsPets>
      {searchPetsStore.isLoading ? (
        <Loading loadingRing />
      ) : (
        <ListPets pets={searchPetsStore.petsAdopted} />
      )}
    </>
  )
}

export default observer(PetsAdopted)
