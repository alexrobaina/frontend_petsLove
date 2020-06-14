import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import CreatePetStore from 'stores/CreatePetStore'
import InputCheckbox from 'components/commons/InputCheckbox'
import { useTranslation } from 'react-i18next'
import LayoutForm from 'components/commons/LayoutForm'
import styles from './medicalReportsPets.scss'
import InputDate from 'components/commons/InputDate'
import Textarea from '../../../components/commons/Textarea/Textarea'
import InputSelect from '../../../components/commons/InputSelect'

const MedicalReportsPets = ({ createPetStore, optionsSelectsStore }) => {
  const { t } = useTranslation()

  const handleDateChange = useCallback(date => {
    console.log(date)
  }, [])

  return (
    <LayoutForm>
      <div className={styles.title}>{t('Medical information')}</div>
      <div className={styles.colums}>
        <InputDate handleDateChange={handleDateChange} label={'Ultima visita al veterinario'} />
      </div>
      <div className={styles.colums}>
        <InputSelect
          label={"Que veterinario lo atendió"}
          isEdit={createPetStore.isEdit}
          // handleChange={handleChangeCategory}
          // value={createPetStore.pet.category.value}
          options={createPetStore.vets}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('¿Sabes si esta castrado?')}
          // value={createPetStore.pet.sterilized}
          // handleChange={handleChangePetOwnership}
        />
      </div>
      <div className={styles.colums}>
        <div className={styles.subtitle}>{t('Formulario de vacunas para gatitos')}</div>
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('Vacuna contra Moquillo (Panleucopenia)?')}
          // value={createPetStore.pet.sterilized}
          // handleChange={handleChangePetOwnership}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('Vacuna contra Gripe felina (Rinotraqueítis)')}
          // value={createPetStore.pet.sterilized}
          // handleChange={handleChangePetOwnership}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('Vacuna contra Leucemia felina')}
          // value={createPetStore.pet.sterilized}
          // handleChange={handleChangePetOwnership}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('Vacuna contra Peritonitis infecciosa felina')}
          // value={createPetStore.pet.sterilized}
          // handleChange={handleChangePetOwnership}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('Vacuna contra Rabia')}
          // value={createPetStore.pet.sterilized}
          // handleChange={handleChangePetOwnership}
        />
      </div>
      <div className={styles.colums}>
        <Textarea label="Notas" isEdit rows={5} />
      </div>
    </LayoutForm>
  )
}

MedicalReportsPets.propTypes = {
  createPetStore: PropTypes.instanceOf(CreatePetStore).isRequired,
}

export default MedicalReportsPets
