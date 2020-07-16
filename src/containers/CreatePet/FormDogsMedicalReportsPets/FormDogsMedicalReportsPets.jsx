import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import moment from 'moment'
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
    createPetStore.pet.medicalInformationDog.setLastVisitVet(date)
  }, [])

  const handleChangeVet = useCallback(value => {
    createPetStore.pet.medicalInformationDog.setVet(value.value)
  }, [])

  const handleDateIsCastrated = useCallback(() => {
    createPetStore.pet.medicalInformationDog.setIsCastrated()
  }, [])

  const handleChangeDistemperVaccine = useCallback(() => {
    createPetStore.pet.medicalInformationDog.setDistemperVaccine()
  }, [])

  const handleChangeHepatitisVaccine = useCallback(() => {
    createPetStore.pet.medicalInformationDog.setHepatitisVaccine()
  }, [])

  const handleChangeLeptospirosisVaccine = useCallback(() => {
    createPetStore.pet.medicalInformationDog.setLeptospirosisVaccine()
  }, [])

  const handleChangeParvovirusVaccine = useCallback(() => {
    createPetStore.pet.medicalInformationDog.setParvovirusVaccine()
  }, [])

  const handleChangeRabiesVaccine = useCallback(() => {
    createPetStore.pet.medicalInformationDog.setRabiesVaccine()
  }, [])

  const handleChangeParainfluenzaVaccine = useCallback(() => {
    createPetStore.pet.medicalInformationDog.setParainfluenzaVaccine()
  }, [])

  const handleChangeBordetellaBronchisepticVaccine = useCallback(() => {
    createPetStore.pet.medicalInformationDog.setBordetellaBronchisepticVaccine()
  }, [])

  const handleChangeNotes = useCallback(e => {
    createPetStore.pet.medicalInformationDog.setNotes(e.target.value)
  }, [])

  const {
    getLastVisitVet,
    getIsCastrated,
    getRabiesVaccine,
    getDistemperVaccine,
    getHepatitisVaccine,
    getLeptospirosisVaccine,
    getParvovirusVaccine,
    getParainfluenzaVaccine,
    getBordetellaBronchisepticVaccine,
    getNotes,
    notes,
    vet,
  } = createPetStore.pet.medicalInformationDog

  const { optionsUserVet } = createPetStore

  return (
    <LayoutForm>
      <div className={styles.title}>{t('subtitleStepTwo')}</div>
      <div className={styles.colums}>
        <InputDate
          label={t('visitVet')}
          value={moment(getLastVisitVet).format('L')}
          handleDateChange={handleDateChange}
        />
      </div>
      <div className={styles.colums}>
        <InputSelect
          isEdit
          value={vet.value}
          inputStore={vet}
          label={t('whoVet')}
          options={optionsUserVet}
          handleChange={handleChangeVet}
          placeholder={t('common:select')}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          value={getIsCastrated}
          text={t('isCastrated')}
          handleChange={handleDateIsCastrated}
        />
      </div>
      <div className={styles.colums}>
        <div className={styles.subtitle}>{t('dogVaccinationForm')}</div>
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          value={getDistemperVaccine}
          text={t('canineDistemper')}
          handleChange={handleChangeDistemperVaccine}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          value={getHepatitisVaccine}
          text={t('isVaccinatedHepatitis')}
          handleChange={handleChangeHepatitisVaccine}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          value={getLeptospirosisVaccine}
          text={t('isVaccinatedLeptospirosis')}
          handleChange={handleChangeLeptospirosisVaccine}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          value={getParvovirusVaccine}
          text={t('isVaccinatedParvovirusis')}
          handleChange={handleChangeParvovirusVaccine}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          value={getRabiesVaccine}
          text={t('vaccinatedRabies')}
          handleChange={handleChangeRabiesVaccine}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          value={getParainfluenzaVaccine}
          text={t('isVaccinatedParainfluenza')}
          handleChange={handleChangeParainfluenzaVaccine}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('isVaccinatedBronchiseptic')}
          value={getBordetellaBronchisepticVaccine}
          handleChange={handleChangeBordetellaBronchisepticVaccine}
        />
      </div>
      <div className={styles.colums}>
        <Textarea
          isEdit
          rows={5}
          value={getNotes}
          inputStore={notes}
          label={t('notes')}
          handleChange={handleChangeNotes}
        />
      </div>
    </LayoutForm>
  )
}

FormDogsMedicalReportsPets.propTypes = {
  createPetStore: PropTypes.instanceOf(CreatePetStore).isRequired,
}

export default observer(FormDogsMedicalReportsPets)
