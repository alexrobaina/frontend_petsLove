import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import c from 'classnames'
import InformationPet from 'components/InformationPet'
import MedicalInformationDog from 'components/MedicalInformationDog'
import MedicalInformationCat from 'components/MedicalInformationCat'
import styles from './tabViewInformationPet.scss'

const TabViewInformationPet = ({ pet, history }) => {
  const [step, setStep] = useState(1)
  const { t } = useTranslation()
  console.log(pet.getNotes)
  return (
    <div className={styles.containerCard}>
      <div className={styles.contactInformation}>
        <div className={styles.containerButtonsTabs}>
          <div
            onClick={() => setStep(1)}
            className={c(styles.actionButton, step === 1 && styles.actionButtonSelected)}
          >
            Info basica
          </div>
          <div
            onClick={() => setStep(2)}
            className={c(styles.actionButton, step === 2 && styles.actionButtonSelected)}
          >
            Ficha médica
          </div>

          <div
            onClick={() => setStep(3)}
            className={c(styles.actionButton, step === 3 && styles.actionButtonSelected)}
          >
            Historia
          </div>
        </div>
        <div className={styles.containerInformation}>
          <div
            className={c(
              styles.information,
              styles.informationPet,
              step === 1 && styles.selectedStep
            )}
          >
            <InformationPet title={t('basicInformation')} pet={pet} />
          </div>
          <div className={c(styles.information, step === 2 && styles.selectedStep)}>
            {pet.getCategory === 'dog' && (
              <>
                <MedicalInformationDog title={t('medicalInformation')} pet={pet} />
              </>
            )}
            {pet.category.value === 'cat' && (
              <>
                <MedicalInformationCat title={t('medicalInformation')} pet={pet} />
              </>
            )}
            {pet.category.value === 'exotic' && (
              <div
                className={c(styles.information, styles.history, step === 2 && styles.selectedStep)}
              >
                {pet.getNotes}
              </div>
            )}
          </div>
          <div className={c(styles.information, styles.history, step === 3 && styles.selectedStep)}>
            {history}
          </div>
        </div>
      </div>
    </div>
  )
}

TabViewInformationPet.propTypes = {
  history: PropTypes.string,
}

TabViewInformationPet.defaultProps = {
  history: '',
}

export default observer(TabViewInformationPet)
