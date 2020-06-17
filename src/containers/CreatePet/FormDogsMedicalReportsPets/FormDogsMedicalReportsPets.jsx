import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import CreatePetStore from 'stores/CreatePetStore'
import InputCheckbox from 'components/commons/InputCheckbox'
import { useTranslation } from 'react-i18next'
import LayoutForm from 'components/commons/LayoutForm'
import InputDate from 'components/commons/InputDate'
import Textarea from 'components/commons/Textarea/Textarea'
import InputSelect from 'components/commons/InputSelect'
import styles from './formDogsMedicalReportsPets.scss'

const FormDogsMedicalReportsPets = ({ createPetStore }) => {
  const { t } = useTranslation('createPet')

  const handleDateChange = useCallback(date => {
    createPetStore.setLastVisitVet(date)
  }, [])

  const handleChangeVet = useCallback(option => {
    createPetStore.setVet(option)
  }, [])

  const handleDateIsCastrated = useCallback(() => {
    createPetStore.setIsCastrated()
  }, [])

  const handleChangeDistemperVaccine = useCallback(() => {
    createPetStore.setDistemperVaccine()
  }, [])

  const handleChangeHepatitisVaccine = useCallback(() => {
    createPetStore.setHepatitisVaccine()
  }, [])

  const handleChangeLeptospirosisVaccine = useCallback(() => {
    createPetStore.setLeptospirosisVaccine()
  }, [])

  const handleChangeParvovirusVaccine = useCallback(() => {
    createPetStore.setParvovirusVaccine()
  }, [])

  const handleChangeRabiesVaccine = useCallback(() => {
    createPetStore.setRabiesVaccine()
  }, [])
  
  const handleChangeParainfluenzaVaccine = useCallback(() => {
    createPetStore.setParainfluenzaVaccine()
  }, [])
  
  const handleChangeBordetellaBronchisepticVaccine = useCallback(() => {
    createPetStore.setBordetellaBronchisepticVaccine()
  }, [])

  const handleChangeNotes = useCallback(e => {
    createPetStore.setNotes(e.target.value)
  }, [])

  return (
    <LayoutForm>
      <div className={styles.title}>{t('subtitleStepTwo')}</div>
      <div className={styles.colums}>
        <InputDate handleDateChange={handleDateChange} label={t('visitVet')} />
      </div>
      <div className={styles.colums}>
        <InputSelect
          options={createPetStore.vets}
          isEdit={createPetStore.isEdit}
          handleChange={handleChangeVet}
          label={t('whoVet')}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('isCastrated')}
          handleChange={handleDateIsCastrated}
          value={createPetStore.pet.isCastrated}
        />
      </div>
      <div className={styles.colums}>
        <div className={styles.subtitle}>{t('dogVaccinationForm')}</div>
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          value={createPetStore.pet.distemperVaccine}
          handleChange={handleChangeDistemperVaccine}
          text={t('canineDistemper')}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('isVaccinatedHepatitis')}
          value={createPetStore.pet.hepatitisVaccine}
          handleChange={handleChangeHepatitisVaccine}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('isVaccinatedLeptospirosis')}
          value={createPetStore.pet.leptospirosisVaccine}
          handleChange={handleChangeLeptospirosisVaccine}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('isVaccinatedParvovirusis')}
          handleChange={handleChangeParvovirusVaccine}
          value={createPetStore.pet.parvovirusVaccine}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('vaccinatedRabies')}
          value={createPetStore.pet.rabiesVaccine}
          handleChange={handleChangeRabiesVaccine}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('isVaccinatedParainfluenza')}
          value={createPetStore.pet.parainfluenzaVaccine}
          handleChange={handleChangeParainfluenzaVaccine}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('isVaccinatedBronchiseptic')}
          value={createPetStore.pet.bordetellaBronchisepticVaccine}
          handleChange={handleChangeBordetellaBronchisepticVaccine}
        />
      </div>
      <div className={styles.colums}>
        <Textarea
          isEdit
          rows={5}
          label={t('notes')}
          handleChange={handleChangeNotes}
          inputStore={createPetStore.pet.notes}
          value={createPetStore.pet.notes.value}
        />
      </div>
    </LayoutForm>
  )
}

FormDogsMedicalReportsPets.propTypes = {
  createPetStore: PropTypes.instanceOf(CreatePetStore).isRequired,
}

export default observer(FormDogsMedicalReportsPets)
