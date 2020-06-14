import React, { useCallback, useContext, useEffect, useState } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router'
import c from 'classnames'
import { FaUserCog } from 'react-icons/fa'
import { GiHealthPotion } from 'react-icons/gi'
import { MdEditLocation, MdPets } from 'react-icons/md'
import LayoutContainer from 'components/commons/LayoutContainer'
import CreatePetStore from 'stores/CreatePetStore'
import UserContext from 'Context/UserContext'
import Button from 'components/commons/Button'
import BasicFormPet from './BasicFormPet/BasicFormPet'
import InformationUserPet from './InformationUserPet/InformationUserPet'
import LocationFormPet from './LocationFormPet/LocationFormPet'
import styles from './createPet.scss'
import MedicalReportsPets from './MedicalReportsPets/MedicalReportsPets'

const CreatePet = () => {
  const { t } = useTranslation('createPet')
  const history = useHistory()
  const { id } = useParams()
  const [onlySave, setOnlySave] = useState(false)
  const [step, setStep] = useState(1)
  const rootStore = useContext(UserContext)
  const { optionsSelectsStore, authStore } = rootStore
  const createPetStore = useLocalStore(() => new CreatePetStore())

  const handleSave = useCallback(() => {
    if (id) {
      createPetStore.saveEdit()
    } else {
      createPetStore.save(authStore.user._id)
    }
  }, [])

  const handleNext = step => {
    setStep(step + 1)
  }

  const handleBack = step => {
    setStep(step - 1)
  }

  useEffect(() => {
    optionsSelectsStore.listAges()
    optionsSelectsStore.listGender()
    optionsSelectsStore.listActiviy()
    optionsSelectsStore.listCategories()

    if (id) {
      createPetStore.searchPetForId(id)
      createPetStore.setCancelEdit()
    } else {
      createPetStore.setEdit()
      setOnlySave(true)
    }

    if (createPetStore.requestSuccess) {
      history.push('/')
      history.push(`/profile-pets/${createPetStore.idPet}`)
    }
  }, [createPetStore.requestSuccess])
  
  console.log(createPetStore.pet.category.value)
  
  function getStepForm() {
    if (step === 1) {
      return (
        <BasicFormPet createPetStore={createPetStore} optionsSelectsStore={optionsSelectsStore} />
      )
    }

    if (step === 2) {
      return <MedicalReportsPets createPetStore={createPetStore} optionsSelectsStore={optionsSelectsStore}/>
    }

    if (step === 3) {
      return <LocationFormPet createPetStore={createPetStore} />
    }
  }

  return (
    <LayoutContainer title={t('title')}>
      <div className={styles.containerSteps}>
        <div
          onClick={() => setStep(1)}
          className={c(styles.stepInformation, step === 1 && styles.formSelected)}
        >
          <MdPets size={20} />
        </div>
        <div
          onClick={() => setStep(2)}
          className={c(styles.stepInformation, step === 2 && styles.formSelected)}
        >
          <GiHealthPotion size={20} />
        </div>
        <div
          onClick={() => setStep(3)}
          className={c(styles.stepInformation, step === 3 && styles.formSelected)}
        >
          <MdEditLocation size={20} />
        </div>
        <div className={styles.stepLine} />
      </div>
      {getStepForm()}
      <div className={styles.containerButton}>
        <Button disable={step === 1} handleClick={() => handleBack(step)} text={'Back'} />
        {step === 3 ? (
          <Button handleClick={handleSave} text={'Save'} />
        ) : (
          <Button handleClick={() => handleNext(step)} text={'Next'} />
        )}
      </div>
    </LayoutContainer>
  )
}

export default observer(CreatePet)
