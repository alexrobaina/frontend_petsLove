import React, { useContext } from 'react'
import UserContext from 'Context/UserContext'
import { observer } from 'mobx-react'
import { SHELTER, ADOPTER, VET } from 'config/roles'
import DashboardProtectionist from './DashboardProtectionist'
import DashboardAdopter from './DashboardAdopter'
import DashboardVet from './DashboardVet'
import DashboardTransit from './DashboardTransit'

const Dashboard = () => {
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  if (authStore.user.role === SHELTER) {
    return <DashboardProtectionist />
  }

  if (authStore.user.role === ADOPTER) {
    return <DashboardAdopter />
  }

  if (authStore.user.role === VET) {
    return <DashboardVet />
  }

  return <DashboardTransit />
}

export default observer(Dashboard)
