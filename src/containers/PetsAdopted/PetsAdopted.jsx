import React, { useContext, useEffect } from 'react'
// import PropTypes from 'prop-types'
import UserContext from 'Context/UserContext'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import Navbar from 'components/commons/Navbar/Navbar'
import ListPets from 'components/ListPets'
import LayoutContainer from 'components/commons/LayoutContainer'
// import styles from './petsAdopted.scss'

const PetsAdopted = () => {
  const { t } = useTranslation('petsAdopted')
  const rootStore = useContext(UserContext)
  const { searchPetsStore, authStore } = rootStore

  useEffect(() => {
    searchPetsStore.getPetAdopted(authStore.user._id)
  }, [])

  return (
    <Navbar>
      <LayoutContainer title={t('title')}>
        <ListPets pets={searchPetsStore.petsAdopted} />
      </LayoutContainer>
    </Navbar>
  )
}

// PetsAdopted.propTypes = {}

export default observer(PetsAdopted)
