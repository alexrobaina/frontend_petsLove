import React from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import CreatePetStore from 'stores/CreatePetStore'
import FormCatsMedicalReportsPets from '../FormCatsMedicalReportsPets'
import FormDogsMedicalReportsPets from '../FormDogsMedicalReportsPets'

const MedicalReportsPets = ({ createPetStore }) => {
  if (createPetStore.pet.category.value === 'cat') {
    return <FormCatsMedicalReportsPets createPetStore={createPetStore} />
  }

  return <FormDogsMedicalReportsPets createPetStore={createPetStore} />
}

MedicalReportsPets.propTypes = {
  createPetStore: PropTypes.instanceOf(CreatePetStore).isRequired,
}

export default observer(MedicalReportsPets)
