import React, { useContext, useEffect } from 'react'
import UserContext from 'Context/UserContext'
import { observer, useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import LayoutContainer from 'components/commons/LayoutContainer'
import DashboardCard from 'components/commons/DashboardCard'
import SearchPetsStore from 'stores/SearchPetsStore'
import Navbar from 'components/commons/Navbar'
import ListPets from 'components/ListPets'
import icon from './businessman.svg'
import styles from './dashboard.scss'

const Dashboard = () => {
  const searchPetsStore = useLocalStore(() => new SearchPetsStore())
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  const { t } = useTranslation('dashboard')

  useEffect(() => {
    searchPetsStore.getPetForUser(authStore.user._id)
    searchPetsStore.getPetAdopted(authStore.user._id)
  }, [])

  console.log(searchPetsStore.pets)
  return (
    <Navbar>
      <LayoutContainer>
        <div className={styles.container}>
          <DashboardCard
            icon={icon}
            numberCard={searchPetsStore.petsAdopted.length}
            titleCard={t('petsAdopted')}
          />
          <DashboardCard
            icon={icon}
            numberCard={searchPetsStore.pets.length}
            titleCard={t('petsForAdoption')}
          />
        </div>
        <ListPets pets={searchPetsStore.pets} />
      </LayoutContainer>
    </Navbar>
  )
}

export default observer(Dashboard)
