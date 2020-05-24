import { useTranslation } from 'react-i18next'
import React, { useContext, useEffect } from 'react'
import DashboardCard from 'components/commons/DashboardCard'
import { observer, useLocalStore } from 'mobx-react'
import LayoutContainer from 'components/commons/LayoutContainer'
import ListPets from 'components/ListPets'
import SearchPetsStore from 'stores/SearchPetsStore'
import UserContext from 'Context/UserContext'
import cat from './animal.svg'
import dog from './dog-tags-military.svg'
import styles from './adopterUser.scss'

const AdopterUser = () => {
  const { t } = useTranslation('dashboard')
  const searchPetsStore = useLocalStore(() => new SearchPetsStore())
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  useEffect(() => {
    searchPetsStore.getPetForUser(authStore.user._id)
  }, [])

  return (
    <LayoutContainer>
      <div className={styles.container}>
        <DashboardCard icon={cat} iconTwo={dog} titleCard={t('adopterUser.rol')} />
      </div>
      <ListPets isUserAdopt pets={searchPetsStore.petsUserAdopt} />
    </LayoutContainer>
  )
}

export default observer(AdopterUser)
