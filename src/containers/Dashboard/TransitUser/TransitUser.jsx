import React, { useContext, useEffect } from 'react'
import DashboardCard from 'components/commons/DashboardCard'
import { useTranslation } from 'react-i18next'
import LayoutContainer from 'components/commons/LayoutContainer'
import UserContext from 'Context/UserContext'
import { useLocalStore } from 'mobx-react'
import PetsUserTransit from 'containers/PetsUserTransit'
import SearchPetsStore from 'stores/SearchPetsStore'
import cat from '../AdopterUser/animal.svg'
import dog from '../AdopterUser/dog-tags-military.svg'
import styles from './transitUser.scss'

const TransitUser = () => {
  const { t } = useTranslation('dashboard')
  const searchPetsStore = useLocalStore(() => new SearchPetsStore())
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  useEffect(() => {
    searchPetsStore.getPetsUserTransit(authStore.user._id)
  }, [])

  return (
    <LayoutContainer>
      <div className={styles.container}>
        <DashboardCard icon={cat} iconTwo={dog} titleCard={t('transitUser.titleCard')} />
      </div>
      <PetsUserTransit id={authStore.user._id} />
    </LayoutContainer>
  )
}

TransitUser.propTypes = {}

export default TransitUser
