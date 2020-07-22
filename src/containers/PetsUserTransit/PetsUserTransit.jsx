import React, { useContext } from 'react'
import UserContext from 'Context/UserContext'
import { observer } from 'mobx-react'
import LayoutContainerCardsPets from 'components/commons/LayoutContainerCardsPets'
import Title from 'components/commons/Title'
import ListPets from 'components/ListPets'
import { useTranslation } from 'react-i18next'

const PetsUserTransit = () => {
  const { t } = useTranslation('dashboard')
  const rootStore = useContext(UserContext)
  const { searchPetsStore } = rootStore

  return (
    <>
      <LayoutContainerCardsPets>
        <Title title={t('transitUser.titlepetsList')} />
      </LayoutContainerCardsPets>
      <ListPets pets={searchPetsStore.petsUserTransit} />
    </>
  )
}

export default observer(PetsUserTransit)
