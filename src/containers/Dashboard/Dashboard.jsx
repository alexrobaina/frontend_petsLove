import React, { useContext } from 'react'
import UserContext from 'Context/UserContext'
import { observer } from 'mobx-react'
import { PROTECTIONIST, ADOPTER } from 'config/roles'
import ProtectionistUser from './ProtectionistUser'
import AdopterUser from './AdopterUser'
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

  return <TransitUser />
}

export default observer(Dashboard)
