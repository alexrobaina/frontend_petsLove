import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Input from '../commons/Input'
import Button from '../commons/Button'
import styles from './formForgotPassword.scss'

const FormForgotPassword = () => {
  const { t } = useTranslation('forgotPassword')

  return (
    <div className={styles.centerForgotPassword}>
      <div className={styles.title}>{t('title')}</div>
      <div className={styles.inputForm}>
        <Input isEdit canEdit placeholder={t('enterYourEmail')} />
      </div>
      <div className={styles.buttonForgotPassword}>
        <Button bigButton text={t('changePassword')} />
      </div>
      <div className={styles.forgotPassword}>
        <Link to="login" className={styles.textSingIn}>
          {t('login')}
        </Link>
      </div>
    </div>
  )
}

export default FormForgotPassword
