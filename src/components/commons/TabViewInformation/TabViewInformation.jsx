import React, { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import c from 'classnames'
import Button from 'components/commons/Button'
import AlertToast from 'components/commons/AlertToast/AlertToast'
import TextCard from 'components/commons/TextCard'
import styles from './tabViewInformation.scss'

const TabViewInformation = ({ isPet, phone, email, aboutUs, requirementsToAdopt }) => {
  const [toggleToast, setToggleToast] = useState(false)
  const [step, setStep] = useState(1)
  const { t } = useTranslation()

  const handleWhatsapp = useCallback(() => {
    if (phone) {
      window.open(`https://api.whatsapp.com/send?phone=${phone}`)
    } else {
      setToggleToast(true)
    }
  }, [phone])

  const handleToggleToast = useCallback(() => {
    setToggleToast(false)
  }, [])

  useEffect(() => {
    if (!aboutUs) {
      setStep(2)
    }
    if (!requirementsToAdopt) {
      setStep(3)
    }
    if (aboutUs) {
      setStep(1)
    }
  }, [aboutUs, requirementsToAdopt])

  return (
    <div className={styles.containerCard}>
      <AlertToast
        text={t('callUser')}
        toggleToast={toggleToast}
        handleToggleToast={handleToggleToast}
      />
      <div className={styles.contactInformation}>
        <div className={styles.containerButtonsTabs}>
          {aboutUs && (
            <div
              onClick={() => setStep(1)}
              className={c(styles.actionButton, step === 1 && styles.actionButtonSelected)}
            >
              {isPet ? t('history') : t('aboutUs')}
            </div>
          )}
          {requirementsToAdopt && (
            <div
              onClick={() => setStep(2)}
              className={c(styles.actionButton, step === 2 && styles.actionButtonSelected)}
            >
              {t('requirementsToAdopt')}
            </div>
          )}
          <div
            onClick={() => setStep(3)}
            className={c(styles.actionButton, step === 3 && styles.actionButtonSelected)}
          >
            {t('contact')}
          </div>
        </div>
        <div className={styles.containerInformation}>
          {aboutUs && (
            <div className={c(styles.information, step === 1 && styles.selectedStep)}>
              <TextCard text={aboutUs} />
            </div>
          )}
          {requirementsToAdopt && (
            <div className={c(styles.information, step === 2 && styles.selectedStep)}>
              <TextCard text={requirementsToAdopt} />
            </div>
          )}
          <div className={c(styles.information, step === 3 && styles.contactData)}>
            {phone && (
              <div className={styles.contactButton}>
                <Button bigButton handleClick={handleWhatsapp} text={t('whatssapButton')} />
              </div>
            )}
            <div className={styles.contact}>
              {t('email')}:<span className={styles.email}>{email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

TabViewInformation.propTypes = {
  email: PropTypes.string,
  phone: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  aboutUs: PropTypes.string,
  requirementsToAdopt: PropTypes.string,
}

TabViewInformation.defaultProps = {
  email: '',
  phone: '',
  aboutUs: '',
  requirementsToAdopt: '',
}

export default TabViewInformation
