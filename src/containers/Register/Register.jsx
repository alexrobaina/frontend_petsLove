import React, { useCallback } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import RegisterStore from 'stores/RegisterStore'
import FormRegisterStepOne from './FormRegisterStepOne'

const Register = () => {
  const registerStore = useLocalStore(() => new RegisterStore())

  const handleCreateUser = useCallback(() => {
    registerStore.createUser()
  }, [])

  return <FormRegisterStepOne handleCreateUser={handleCreateUser} registerStore={registerStore} />
}

export default observer(Register)
