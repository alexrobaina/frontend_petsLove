import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Input from '../commons/Input'
import Button from '../commons/Button'
import styles from './formForgotPassword.scss'

const FormForgotPassword = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.centerForgotPassword}>
      <div className={styles.title}>{t('forgotPassword.title')}</div>
      <div className={styles.inputForm}>
        <Input placeholder={t('forgotPassword.enterYourEmail')} />
      </div>
      <div className={styles.buttonForgotPassword}>
        <Button bigButton text={t('forgotPassword.changePassword')} />
      </div>
      <div className={styles.forgotPassword}>
        <Link to="login" className={styles.textSingIn}>
          {t('forgotPassword.login')}
        </Link>
      </div>
    </div>
  )
}

export default FormForgotPassword
