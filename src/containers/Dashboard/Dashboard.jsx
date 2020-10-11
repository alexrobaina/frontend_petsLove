import React, { useContext } from 'react'
import UserContext from 'Context/UserContext'
import { observer } from 'mobx-react'
import { SHELTER, ADOPTER, VET } from 'config/roles'
import DashboardShelter from './DashboardShelter'
import DashboardAdopter from './DashboardAdopter'
import DashboardVeterinary from './DashboardVeterinary'
import DashboardVoluntary from './DashboardVoluntary'

const Dashboard = () => {
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore
  // Dashboard can state in one component because for
  // repete code. >_<
  if (authStore.user.role === SHELTER) {
    return <DashboardShelter />
  }

  if (authStore.user.role === ADOPTER) {
    return <DashboardAdopter />
  }

  if (authStore.user.role === VET) {
    return <DashboardVeterinary />
  }

  return <DashboardVoluntary />
}

export default observer(Dashboard)
