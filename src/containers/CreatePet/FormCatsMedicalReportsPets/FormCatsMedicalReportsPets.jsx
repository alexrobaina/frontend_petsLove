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
import styles from './formCatsMedicalReportsPets.scss'

const FormCatsMedicalReportsPets = ({ createPetStore }) => {
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

  const handleChangeFelineFluVaccine = useCallback(() => {
    createPetStore.setFelineFluVaccine()
  }, [])

  const handleChangeFelineLeukemiaVaccine = useCallback(() => {
    createPetStore.setFelineLeukemiaVaccine()
  }, [])

  const handleChangePeritonitisVaccine = useCallback(() => {
    createPetStore.setFelineInfectiousPeritonitisVaccine()
  }, [])

  const handleChangeRabiesVaccine = useCallback(() => {
    createPetStore.setRabiesVaccine()
  }, [])

  const handleChangeNotes = useCallback(e => {
    createPetStore.setNotes(e.target.value)
  }, [])

  return (
    <LayoutForm>
      <div className={styles.title}>{t('subtitleStepTwo')}</div>
      <div className={styles.colums}>
        <InputDate
          label={t('visitVet')}
          handleDateChange={handleDateChange}
          value={createPetStore.pet.getLastVisitVet}
        />
      </div>
      <div className={styles.colums}>
        <InputSelect
          label={t('whoVet')}
          options={createPetStore.vets}
          isEdit={createPetStore.isEdit}
          handleChange={handleChangeVet}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('isCastrated')}
          value={createPetStore.pet.isCastrated}
          handleChange={handleDateIsCastrated}
        />
      </div>
      <div className={styles.colums}>
        <div className={styles.subtitle}>{t('catVaccinationForm')}</div>
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('isDistemperVaccine')}
          value={createPetStore.pet.distemperVaccine}
          handleChange={handleChangeDistemperVaccine}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('felineFluVaccine')}
          value={createPetStore.pet.felineFluVaccine}
          handleChange={handleChangeFelineFluVaccine}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('felineLeukemia')}
          value={createPetStore.pet.felineLeukemiaVaccine}
          handleChange={handleChangeFelineLeukemiaVaccine}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('felineInfectiousPeritonitis')}
          value={createPetStore.pet.felineInfectiousPeritonitisVaccine}
          handleChange={handleChangePeritonitisVaccine}
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
        <Textarea
          isEdit
          rows={5}
          label={t('common:notes')}
          handleChange={handleChangeNotes}
          inputStore={createPetStore.pet.notes}
          value={createPetStore.pet.notes.value}
        />
      </div>
    </LayoutForm>
  )
}

FormCatsMedicalReportsPets.propTypes = {
  createPetStore: PropTypes.instanceOf(CreatePetStore).isRequired,
}

export default observer(FormCatsMedicalReportsPets)
