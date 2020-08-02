import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { observer, useLocalStore } from 'mobx-react'
import { FaHandHoldingHeart } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { AiFillFileAdd } from 'react-icons/ai'
import UserContext from 'Context/UserContext'
import SearchPetsStore from 'stores/SearchPetsStore'
import DashboardCard from 'components/commons/DashboardCard'
import PetsAdopted from 'containers/PetsAdopted'
import { CREATE_PET, SEARCH_VOLANTEERS } from 'routing/routes'
import Title from 'components/commons/Title'
import ForAdoption from 'containers/ForAdoption'
import LayoutContainer from 'components/commons/LayoutContainer'
import styles from './dashboardProtectionist.scss'

const DashboardProtectionist = () => {
  const [swith, setSwith] = useState(false)
  const history = useHistory()
  const searchPetsStore = useLocalStore(() => new SearchPetsStore())
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore
  const { t } = useTranslation('dashboard')

  const handlePetsForAdoption = useCallback(() => {
    setSwith(false)
  }, [])

  const handlePetsAdopted = useCallback(() => {
    setSwith(true)
  }, [])

  const handleCreatePet = useCallback(() => {
    history.push(CREATE_PET)
  }, [])

  const handleSearchVolanteers = useCallback(() => {
    history.push(SEARCH_VOLANTEERS)
  }, [])

  useEffect(() => {
    searchPetsStore.getPetsForAdoption(authStore.user._id)
    searchPetsStore.getPetAdopted(authStore.user._id)
  }, [])

  return (
    <LayoutContainer>
      <Title mBottom="30px" title={t('common:dashboard')} />
      <div className={styles.container}>
        <DashboardCard
          handleClick={handlePetsForAdoption}
          titleCard={t('protectionistUser.petsAdopt')}
          total={searchPetsStore.totalPetsForAdoption}
        />
        <DashboardCard
          handleClick={handlePetsAdopted}
          total={searchPetsStore.totalPetsAdopted}
          titleCard={t('protectionistUser.petsAdopted')}
        />
        <DashboardCard
          handleClick={handleCreatePet}
          icon={<AiFillFileAdd size={25} />}
          titleCard={t('protectionistUser.addPet')}
        />
        <DashboardCard
          handleClick={handleSearchVolanteers}
          icon={<FaHandHoldingHeart size={22} />}
          titleCard={t('protectionistUser.searchVolanteers')}
        />
      </div>
      {swith && <PetsAdopted id={authStore.user._id} />}
      {!swith && <ForAdoption id={authStore.user._id} />}
    </LayoutContainer>
  )
}

export default observer(DashboardProtectionist)
