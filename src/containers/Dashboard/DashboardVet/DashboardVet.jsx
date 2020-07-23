import React, { useContext } from 'react'
import DashboardCard from 'components/commons/DashboardCard'
import { useTranslation } from 'react-i18next'
import LayoutContainer from 'components/commons/LayoutContainer'
import UserContext from 'Context/UserContext'
import PetsUserVet from 'containers/PetsUserVet'
import cat from '../DashboardAdopter/animal.svg'
import dog from '../DashboardAdopter/dog-tags-military.svg'
import styles from './dashboardVet.scss'

const DashboardVet = () => {
  const { t } = useTranslation('dashboard')
  const rootStore = useContext(UserContext)
  const { searchPetsStore, authStore } = rootStore

  return (
    <LayoutContainer>
      <div className={styles.container}>
        <DashboardCard
          icon={cat}
          iconTwo={dog}
          titleCard={t('userVet.titleCard')}
          totalPets={searchPetsStore.totalPetsVet}
        />
      </div>
      <PetsUserVet id={authStore.user._id} />
    </LayoutContainer>
  )
}

DashboardVet.propTypes = {}

export default DashboardVet
