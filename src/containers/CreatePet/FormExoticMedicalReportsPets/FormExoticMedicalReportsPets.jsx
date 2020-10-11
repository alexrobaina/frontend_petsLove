import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import CreatePetStore from 'stores/CreatePetStore'
import { useTranslation } from 'react-i18next'
import LayoutForm from 'components/commons/LayoutForm'
import Textarea from 'components/commons/Textarea/Textarea'
import styles from './formExoticMedicalReportsPets.scss'

const FormExoticMedicalReportsPets = ({ createPetStore }) => {
  const { t } = useTranslation('createPet')

  const handleChangeNotes = useCallback(e => {
    createPetStore.pet.setNotes(e.target.value)
  }, [])

  const { notes, getNotes } = createPetStore.pet

  return (
    <LayoutForm>
      <div className={styles.title}>{t('medicalInformation')}</div>
      <div className={styles.colums}>
        <Textarea
          isEdit
          rows={5}
          value={getNotes}
          inputStore={notes}
          label={t('common:notes')}
          handleChange={handleChangeNotes}
        />
      </div>
    </LayoutForm>
  )
}

FormExoticMedicalReportsPets.propTypes = {
  createPetStore: PropTypes.instanceOf(CreatePetStore).isRequired,
}

export default observer(FormExoticMedicalReportsPets)
