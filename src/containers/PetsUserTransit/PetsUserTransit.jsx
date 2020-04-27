import React, { useContext, useEffect } from 'react'
import UserContext from 'Context/UserContext'
import { observer } from 'mobx-react'
import Title from 'components/commons/Title'
import LayoutContainer from 'components/commons/LayoutContainer'
import ListPets from 'components/ListPets'

const PetsUserTransit = id => {
  const rootStore = useContext(UserContext)
  const { searchPetsStore } = rootStore

  useEffect(() => {
    searchPetsStore.getPetsUserTransit(id.id)
  }, [])
  return (
    <>
      <LayoutContainer>
        <Title title="My history pets" />
      </LayoutContainer>
      <ListPets pets={searchPetsStore.petsUserTransit} />
    </>
  )
}

export default observer(PetsUserTransit)
