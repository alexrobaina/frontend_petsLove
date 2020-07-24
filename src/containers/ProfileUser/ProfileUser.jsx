import React from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { useParams } from 'react-router'
import UserIdStore from 'stores/UserIdStore'
import { PROTECTIONIST, TRANSIT_USER, VET } from 'config/roles'
import ProtectionistProfile from './ProtectionistProfile'
import TransitUserProfile from './TransitUserProfile'
import AdopterProfile from './AdopterProfile'
import VetProfile from './VetProfile'

const ProfileUser = () => {
  const { id } = useParams()
  const userIdStore = useLocalStore(() => new UserIdStore(id))

  const { role } = userIdStore.user

  if (role === PROTECTIONIST) {
    return <ProtectionistProfile user={userIdStore.user} />
  }

  if (role === TRANSIT_USER) {
    return <TransitUserProfile user={userIdStore.user} />
  }

  if (role === VET) {
    return <VetProfile user={userIdStore.user} />
  }

  return <AdopterProfile user={userIdStore.user} />
}

export default observer(ProfileUser)
