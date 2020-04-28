import { observer, useLocalStore } from 'mobx-react'
import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import ForgotPasswordStore from 'stores/ForgotPasswordStore'
import { useTranslation } from 'react-i18next'
import Input from 'components/commons/Input'
import Button from 'components/commons/Button'
import styles from './formForgotPassword.scss'

const FormForgotPassword = () => {
  const forgotPasswordStore = useLocalStore(() => new ForgotPasswordStore())

  const { t } = useTranslation('forgotPassword')

  const handleChangeEmail = useCallback(e => {
    forgotPasswordStore.setEmail(e.target.value)
  })

  const sendEmail = useCallback(() => {
    forgotPasswordStore.forgotPassword()
  })

  return (
    <div className={styles.centerForgotPassword}>
      <div className={styles.title}>{t('title')}</div>
      <div className={styles.inputForm}>
        {forgotPasswordStore.isError && (
          <div className={styles.error}>No tiene formato de email</div>
        )}
        <Input
          type="email"
          handleChange={handleChangeEmail}
          isEdit
          canEdit
          placeholder={t('enterYourEmail')}
        />
      </div>
      <div className={styles.buttonForgotPassword}>
        <Button handleClick={sendEmail} bigButton text={t('changePassword')} />
      </div>
      <div className={styles.forgotPassword}>
        <Link to="login" className={styles.textSingIn}>
          {t('login')}
        </Link>
      </div>
    </div>
  )
}

export default observer(FormForgotPassword)
