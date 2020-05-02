import React, { useContext, useEffect } from 'react'
import UserContext from 'Context/UserContext'
import { observer } from 'mobx-react'
import Title from 'components/commons/Title'
import LayoutContainerCardsPets from 'components/commons/LayoutContainerCardsPets'
import ListPets from 'components/ListPets'

const PetsAdopted = id => {
  const rootStore = useContext(UserContext)
  const { searchPetsStore } = rootStore

  useEffect(() => {
    searchPetsStore.getPetAdopted(id.id)
  }, [])
  return (
    <>
      <LayoutContainerCardsPets>
        <Title title="Adopted" />
      </LayoutContainerCardsPets>
      <ListPets pets={searchPetsStore.petsAdopted} />
    </>
  )
}

export default observer(PetsAdopted)
