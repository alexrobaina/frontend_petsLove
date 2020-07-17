import React, { useCallback, useContext, useEffect, useState } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import UserContext from 'Context/UserContext'
import SearchPetsStore from 'stores/SearchPetsStore'
import DashboardCard from 'components/commons/DashboardCard'
import PetsAdopted from 'containers/PetsAdopted'
import ForAdoption from 'containers/ForAdoption'
import LayoutContainer from 'components/commons/LayoutContainer'
import dog from '../pet.svg'
import cat from '../cat.svg'
import styles from './protectionistUser.scss'

const ProtectionistUser = () => {
  const [swith, setSwith] = useState(false)
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

  useEffect(() => {
    searchPetsStore.getPetsForAdoption(authStore.user._id)
    searchPetsStore.getPetAdopted(authStore.user._id)
  }, [])

  return (
    <LayoutContainer>
      <div className={styles.container}>
        <DashboardCard
          icon={dog}
          handleClick={handlePetsForAdoption}
          titleCard={t('protectionistUser.petsAdopt')}
          totalPets={searchPetsStore.petsForAdoption.length}
        />
        <DashboardCard
          icon={cat}
          handleClick={handlePetsAdopted}
          titleCard={t('protectionistUser.petsAdopted')}
          totalPets={searchPetsStore.petsAdopted.length}
        />
      </div>
      {swith && <PetsAdopted id={authStore.user._id} />}
      {!swith && <ForAdoption id={authStore.user._id} />}
    </LayoutContainer>
  )
}

export default observer(ProtectionistUser)
