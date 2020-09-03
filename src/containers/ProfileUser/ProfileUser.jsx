import React from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { useParams } from 'react-router'
import UserIdStore from 'stores/UserIdStore'
import { SHELTER, TRANSIT_USER, VET } from 'config/roles'
import ShelterProfile from './ShelterProfile'
import VolunteersProfile from './VolunteersProfile'
import AdopterProfile from './AdopterProfile'
import VetProfile from './VetProfile'

const ProfileUser = () => {
  const { id } = useParams()
  const userIdStore = useLocalStore(() => new UserIdStore(id))

  const { role } = userIdStore.user

  if (role === SHELTER) {
    return <ShelterProfile user={userIdStore.user} />
  }

  if (role === TRANSIT_USER) {
    return <VolunteersProfile user={userIdStore.user} />
  }

  if (role === VET) {
    return <VetProfile user={userIdStore.user} />
  }

  return <AdopterProfile user={userIdStore.user} />
}

export default observer(ProfileUser)
