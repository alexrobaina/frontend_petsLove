import React, { useContext, useCallback } from 'react'
import { AiFillFileAdd } from 'react-icons/ai'
import { FaPeopleCarry } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import DashboardCard from 'components/commons/DashboardCard'
import LayoutContainer from 'components/commons/LayoutContainer'
import Title from 'components/commons/Title/Title'
import UserContext from 'Context/UserContext'
import { CREATE_PET, SEARCH_PROTECTIONIST } from 'routing/routes'
import PetsUserVet from 'containers/PetsUserVet'
import styles from './dashboardVet.scss'

const DashboardVet = () => {
  const history = useHistory()
  const { t } = useTranslation('dashboard')
  const rootStore = useContext(UserContext)
  const { searchPetsStore, authStore } = rootStore

  const handleCreatePet = useCallback(() => {
    history.push(CREATE_PET)
  }, [])

  const handleSearchProtecctionist = useCallback(() => {
    history.push(SEARCH_PROTECTIONIST)
  }, [])

  return (
    <LayoutContainer>
      <Title mBottom="30px" title={t('common:dashboard')} />
      <div className={styles.container}>
        <DashboardCard titleCard={t('userVet.totalPets')} total={searchPetsStore.totalPetsVet} />
        <DashboardCard
          handleClick={handleCreatePet}
          titleCard={t('userVet.addPet')}
          icon={<AiFillFileAdd size={25} />}
        />
        <DashboardCard
          icon={<FaPeopleCarry size={22} />}
          titleCard={t('userVet.searchShelters')}
          handleClick={handleSearchProtecctionist}
        />
      </div>
      <PetsUserVet id={authStore.user._id} />
    </LayoutContainer>
  )
}

DashboardVet.propTypes = {}

export default DashboardVet
