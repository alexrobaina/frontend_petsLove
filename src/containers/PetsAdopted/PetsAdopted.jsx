import React, { useContext, useEffect } from 'react'
import UserContext from 'Context/UserContext'
import { observer } from 'mobx-react'
import Title from 'components/commons/Title'
import LayoutContainer from 'components/commons/LayoutContainer'
import ListPets from 'components/ListPets'

const PetsAdopted = id => {
  const rootStore = useContext(UserContext)
  const { searchPetsStore } = rootStore

  useEffect(() => {
    searchPetsStore.getPetAdopted(id.id)
  }, [])
  return (
    <>
      <LayoutContainer>
        <Title title="Adopted" />
      </LayoutContainer>
      <ListPets pets={searchPetsStore.petsAdopted} />
    </>
  )
}

export default observer(PetsAdopted)
