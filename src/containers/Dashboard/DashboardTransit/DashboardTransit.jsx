import React, { useCallback, useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useLocalStore, observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { FaPeopleCarry } from 'react-icons/fa'
import { AiFillFileAdd } from 'react-icons/ai'
import DashboardCard from 'components/commons/DashboardCard'
import { SEARCH_PROTECTIONIST, SEARCH_VOLANTEERS } from 'routing/routes'
import Title from 'components/commons/Title/Title'
import UserContext from 'Context/UserContext'
import LayoutContainer from 'components/commons/LayoutContainer'
import PetsUserTransit from 'containers/PetsUserTransit'
import SearchPetsStore from 'stores/SearchPetsStore'
import styles from './dashboardTransit.scss'

const DashboardTransit = () => {
  const { t } = useTranslation('dashboard')
  const history = useHistory()
  const searchPetsStore = useLocalStore(() => new SearchPetsStore())
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  const handleSearchVolanteers = useCallback(() => {
    history.push(SEARCH_VOLANTEERS)
  }, [])

  const handleSearchShelters = useCallback(() => {
    history.push(SEARCH_PROTECTIONIST)
  }, [])

  useEffect(() => {
    searchPetsStore.getPetsUserTransit(authStore.user._id)
  }, [])

  return (
    <LayoutContainer>
      <Title mBottom="30px" title={t('common:dashboard')} />
      <div className={styles.container}>
        <DashboardCard
          titleCard={t('transitUser.petsCare')}
          total={searchPetsStore.totalPetsTransit}
        />
        <DashboardCard
          handleClick={handleSearchVolanteers}
          icon={<AiFillFileAdd size={25} />}
          titleCard={t('transitUser.searchVolanteers')}
        />
        <DashboardCard
          handleClick={handleSearchShelters}
          icon={<FaPeopleCarry size={22} />}
          titleCard={t('transitUser.searchShelters')}
        />
      </div>
      <PetsUserTransit id={authStore.user._id} />
    </LayoutContainer>
  )
}

export default observer(DashboardTransit)
