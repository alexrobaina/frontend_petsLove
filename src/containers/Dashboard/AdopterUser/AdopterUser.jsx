import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import DashboardCard from 'components/commons/DashboardCard'
import { observer, useLocalStore } from 'mobx-react'
import LayoutContainer from 'components/commons/LayoutContainer'
import ListPets from 'components/ListPets'
import UserAdopterStore from 'stores/UserAdopterStore'
import UserContext from 'Context/UserContext'
import cat from './animal.svg'
import dog from './dog-tags-military.svg'
import styles from './adopterUser.scss'

const AdopterUser = () => {
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore
  const { t } = useTranslation('dashboard')
  const userAdopterStore = useLocalStore(() => new UserAdopterStore(authStore.user._id))

  return (
    <LayoutContainer>
      <div className={styles.container}>
        <DashboardCard
          totalPets={userAdopterStore.pets.length}
          icon={cat}
          iconTwo={dog}
          titleCard={t('adopterUser.rol')}
        />
      </div>
      <ListPets isUserAdopt pets={userAdopterStore.pets} />
    </LayoutContainer>
  )
}

export default observer(AdopterUser)
