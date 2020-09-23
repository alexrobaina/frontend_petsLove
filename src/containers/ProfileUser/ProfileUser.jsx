import React from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { useParams } from 'react-router'
import UserIdStore from 'stores/UserIdStore'
import { SHELTER, TRANSIT_USER, VET } from 'config/roles'
import Loading from 'components/commons/Loading'
import ShelterProfile from './ShelterProfile'
import VolunteersProfile from './VolunteersProfile'
import AdopterProfile from './AdopterProfile'
import VeterinaryProfile from './VeterinaryProfile'

const ProfileUser = () => {
  const { id } = useParams()
  const userIdStore = useLocalStore(() => new UserIdStore(id))

  const { role, isLoading } = userIdStore.user

  if (isLoading) {
    return <Loading loadingRing />
  }

  if (role.value === SHELTER) {
    return <ShelterProfile user={userIdStore.user} />
  }

  if (role.value === TRANSIT_USER) {
    return <VolunteersProfile user={userIdStore.user} />
  }

  if (role.value === VET) {
    return <VeterinaryProfile user={userIdStore.user} />
  }

  return <AdopterProfile user={userIdStore.user} />
}

export default observer(ProfileUser)
