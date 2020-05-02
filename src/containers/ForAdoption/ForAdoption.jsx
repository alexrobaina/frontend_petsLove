import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react'
import UserContext from 'Context/UserContext'
import LayoutContainerCardsPets from 'components/commons/LayoutContainerCardsPets'
import ListPets from 'components/ListPets'
import Title from 'components/commons/Title'

const ForAdoption = ({ id }) => {
  const rootStore = useContext(UserContext)
  const { searchPetsStore } = rootStore

  useEffect(() => {
    searchPetsStore.getPetsForAdoption(id)
  }, [])

  return (
    <>
      <LayoutContainerCardsPets>
        <Title title="Need Home" />
      </LayoutContainerCardsPets>
      <ListPets pets={searchPetsStore.petsForAdoption} />
    </>
  )
}

export default observer(ForAdoption)
