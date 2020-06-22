import React, { useCallback, useContext, useEffect, useState } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import Tooltip from '@material-ui/core/Tooltip'
import { useHistory } from 'react-router'
import c from 'classnames'
import { GiHealthPotion } from 'react-icons/gi'
import { MdEditLocation, MdPets } from 'react-icons/md'
import LayoutContainer from 'components/commons/LayoutContainer'
import CreatePetStore from 'stores/CreatePetStore'
import Button from 'components/commons/Button'
import BasicFormPet from './BasicFormPet/BasicFormPet'
import LocationFormPet from './LocationFormPet/LocationFormPet'
import MedicalReportsPets from './MedicalReportsPets/MedicalReportsPets'
import styles from './createPet.scss'
import UserContext from '../../Context/UserContext'

const CreatePet = () => {
  const { t } = useTranslation('createPet')
  const history = useHistory()
  const [step, setStep] = useState(1)
  const createPetStore = useLocalStore(() => new CreatePetStore())
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  const handleSave = useCallback(() => {
    createPetStore.saveImage(() => createPetStore.savePet())
  }, [])

  const handleNext = step => {
    if (step === 1) {
      if (createPetStore.firstStepValidation()) {
        setStep(step + 1)
      }
    }
    if (step === 2) {
      setStep(step + 1)
    }
  }

  const handleBack = step => {
    setStep(step - 1)
  }

  useEffect(() => {
    createPetStore.setIdUser(authStore.user._id)
  }, [])

  useEffect(() => {
    if (createPetStore.requestSuccess) {
      history.push(`/dashboard`)
    }
  }, [createPetStore.requestSuccess])

  function getStepForm() {
    if (step === 1) {
      return <BasicFormPet createPetStore={createPetStore} />
    }

    if (step === 2) {
      return <MedicalReportsPets createPetStore={createPetStore} />
    }

    if (step === 3) {
      return <LocationFormPet createPetStore={createPetStore} />
    }
  }

  return (
    <LayoutContainer title={t('title')}>
      <div className={styles.containerSteps}>
        <Tooltip title={t('subtitleStepOne')}>
          <div className={c(styles.stepInformation, step === 1 && styles.formSelected)}>
            <MdPets size={20} />
          </div>
        </Tooltip>
        <Tooltip title={t('subtitleStepTwo')}>
          <div className={c(styles.stepInformation, step === 2 && styles.formSelected)}>
            <GiHealthPotion size={20} />
          </div>
        </Tooltip>
        <Tooltip title={t('subtitleStepThree')}>
          <div className={c(styles.stepInformation, step === 3 && styles.formSelected)}>
            <MdEditLocation size={20} />
          </div>
        </Tooltip>
        <div className={styles.stepLine} />
      </div>
      {getStepForm()}
      <div className={styles.containerButton}>
        <Button disable={step === 1} handleClick={() => handleBack(step)} text={t('back')} />
        {step === 3 ? (
          <Button handleClick={handleSave} text={t('save')} />
        ) : (
          <Button handleClick={() => handleNext(step)} text={t('next')} />
        )}
      </div>
    </LayoutContainer>
  )
}

export default observer(CreatePet)
