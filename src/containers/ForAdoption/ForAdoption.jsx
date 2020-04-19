import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import UserContext from 'Context/UserContext'
import LayoutContainer from 'components/commons/LayoutContainer'
import ListPets from 'components/ListPets'
// import styles from './forAdoption.scss'

const ForAdoption = () => {
  const { t } = useTranslation('forAdoption')
  const rootStore = useContext(UserContext)
  const { searchPetsStore, authStore } = rootStore

  useEffect(() => {
    searchPetsStore.getPetsForAdoption(authStore.user._id)
  }, [])

  return (
    <LayoutContainer title={t('title')}>
      <ListPets pets={searchPetsStore.petsForAdoption} />
    </LayoutContainer>
  )
}

// MyPets.propTypes = {}

export default observer(ForAdoption)
