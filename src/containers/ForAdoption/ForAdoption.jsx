import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react'
import UserContext from 'Context/UserContext'
import ListPets from 'components/ListPets'
import Title from 'components/commons/Title'
import LayoutContainer from '../../components/commons/LayoutContainer'

const ForAdoption = ({ id }) => {
  const rootStore = useContext(UserContext)
  const { searchPetsStore } = rootStore

  useEffect(() => {
    searchPetsStore.getPetsForAdoption(id)
  }, [])

  return (
    <>
      <LayoutContainer>
        <Title title="Need Home" />
      </LayoutContainer>
      <ListPets pets={searchPetsStore.petsForAdoption} />
    </>
  )
}

export default observer(ForAdoption)
