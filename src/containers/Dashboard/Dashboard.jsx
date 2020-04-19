import React, { useContext } from 'react'
import UserContext from 'Context/UserContext'
import { observer } from 'mobx-react'
import ProtectionistUser from './ProtectionistUser'
import AdopterUser from './AdopterUser'
import TransitUser from './TransitUser'

// eslint-disable-next-line consistent-return
const Dashboard = () => {
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  if (authStore.user.rol === 'protectionist') {
    return <ProtectionistUser />
  }

  if (authStore.user.rol === 'adopter') {
    return <AdopterUser />
  }

  if (authStore.user.rol === 'transitUser') {
    return <TransitUser />
  }
}

export default observer(Dashboard)
