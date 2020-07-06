import React from 'react'
import { observer } from 'mobx-react'
import CreatePet from 'containers/CreatePet'

const EditPet = () => {
  return <CreatePet isEdit />
}

export default observer(EditPet)
