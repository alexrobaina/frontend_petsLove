import React, { useContext } from 'react'
import UserContext from 'Context/UserContext'
import { observer } from 'mobx-react'
import { PROTECTIONIST, ADOPTER, VET } from 'config/roles'
import ProtectionistUser from './ProtectionistUser'
import AdopterUser from './AdopterUser'
import DashboardVet from './DashboardVet'
import TransitUser from './TransitUser'

const Dashboard = () => {
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  if (authStore.user.role === PROTECTIONIST) {
    return <ProtectionistUser />
  }

  if (authStore.user.role === ADOPTER) {
    return <AdopterUser />
  }
  
  if (authStore.user.role === VET) {
    return <DashboardVet />
  }

  return <TransitUser />
}

export default observer(Dashboard)
