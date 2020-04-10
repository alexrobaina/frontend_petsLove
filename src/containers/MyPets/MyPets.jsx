import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import UserContext from 'Context/UserContext'
import LayoutContainer from 'components/commons/LayoutContainer'
import ListPets from 'components/ListPets'
import Navbar from 'components/commons/Navbar/Navbar'
// import styles from './myPets.scss'

const MyPets = () => {
  const { t } = useTranslation('myPets')
  const rootStore = useContext(UserContext)
  const { searchPetsStore, authStore } = rootStore

  useEffect(() => {
    searchPetsStore.getPetForUser(authStore.user._id)
  }, [])

  return (
    <Navbar>
      <LayoutContainer title={t('title')}>
        <ListPets pets={searchPetsStore.pets} />
      </LayoutContainer>
    </Navbar>
  )
}

// MyPets.propTypes = {}

export default observer(MyPets)
