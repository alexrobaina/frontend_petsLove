import React, { useContext, useCallback } from 'react'
import { AiFillFileAdd } from 'react-icons/ai'
import { FaPeopleCarry } from 'react-icons/fa'
import { useHistory } from 'react-router'
import { MdSearch } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import DashboardCard from 'components/commons/DashboardCard'
import { observer, useLocalStore } from 'mobx-react'
import LayoutContainer from 'components/commons/LayoutContainer'
import { CREATE_PET, SEARCH_PROTECTIONIST } from 'routing/routes'
import UserAdopterStore from 'stores/UserAdopterStore'
import Title from 'components/commons/Title/Title'
import UserContext from 'Context/UserContext'
import PetsAdopter from 'containers/PetsAdopter'
import styles from './dashboardAdopter.scss'

const DashboardAdopter = () => {
  const rootStore = useContext(UserContext)
  const history = useHistory()
  const { authStore } = rootStore
  const { t } = useTranslation('dashboard')
  const userAdopterStore = useLocalStore(() => new UserAdopterStore(authStore.user._id))

  const handleCreatePet = useCallback(() => {
    history.push(CREATE_PET)
  }, [])

  const handleSearch = useCallback(() => {
    history.push('/')
  }, [])

  const handleSearchProtecctionist = useCallback(() => {
    history.push(SEARCH_PROTECTIONIST)
  }, [])

  return (
    <LayoutContainer>
      <Title mBottom="30px" title={t('common:dashboard')} />
      <div className={styles.container}>
        <DashboardCard
          handleClick={handleCreatePet}
          titleCard={t('adopterUser.addPet')}
          icon={<AiFillFileAdd size={25} />}
        />
        <DashboardCard titleCard={t('adopterUser.myPets')} total={userAdopterStore.totalPets} />
        <DashboardCard
          handleClick={handleSearch}
          icon={<MdSearch size={25} />}
          titleCard={t('adopterUser.searchPets')}
        />
        <DashboardCard
          handleClick={handleSearchProtecctionist}
          icon={<FaPeopleCarry size={22} />}
          titleCard={t('adopterUser.searchShelters')}
        />
      </div>
      <PetsAdopter
        id={authStore.user._id}
        store={userAdopterStore}
        title={t('adopterUser.myPets')}
      />
    </LayoutContainer>
  )
}

export default observer(DashboardAdopter)
