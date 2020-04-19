import React, { useContext, useEffect } from 'react'
// import PropTypes from 'prop-types'
import { observer, useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import UserContext from 'Context/UserContext'
import ListPets from 'components/ListPets'
import SearchPetsStore from 'stores/SearchPetsStore'
import DashboardCard from 'components/commons/DashboardCard'
import LayoutContainer from 'components/commons/LayoutContainer'
import icon from '../businessman.svg'
import styles from '../dashboard.scss'

const ProtectionistUser = () => {
  const searchPetsStore = useLocalStore(() => new SearchPetsStore())
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  const { t } = useTranslation('dashboard')

  useEffect(() => {
    searchPetsStore.getPetForUser(authStore.user._id)
    searchPetsStore.getPetAdopted(authStore.user._id)
  }, [])

  return (
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
  )
}

// ProtectionistUser.propTypes = {}

export default observer(ProtectionistUser)
