import React, { useEffect } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { useParams } from 'react-router'
import UserIdStore from 'stores/UserIdStore'
import ProtectionistProfile from './ProtectionistProfile'
import TransitUserProfile from './TransitUserProfile'
import AdopterProfile from './AdopterProfile'

const ProfileUser = () => {
  const userIdStore = useLocalStore(() => new UserIdStore())
  const { id } = useParams()

  useEffect(() => {
    userIdStore.getUserId(id)
  }, [])

  const { role } = userIdStore.user

  if (role === 'protectionist') {
    return (
      <>
        <ProtectionistProfile user={userIdStore.user} />
      </>
    )
  }

  if (role === 'transitUser') {
    return <TransitUserProfile user={userIdStore.user} />
  }

  return <AdopterProfile user={userIdStore.user} />
}

export default observer(ProfileUser)
