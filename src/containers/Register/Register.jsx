import React, { useCallback } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import RegisterStore from 'stores/RegisterStore'
import FormRegister from './FormRegister'

const Register = () => {
  const registerStore = useLocalStore(() => new RegisterStore())

  const handleCreateUser = useCallback(() => {
    registerStore.createUser()
  }, [])

  return <FormRegister handleCreateUser={handleCreateUser} registerStore={registerStore} />
}

export default observer(Register)
