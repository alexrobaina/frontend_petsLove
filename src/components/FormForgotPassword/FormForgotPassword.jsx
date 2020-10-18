import React, { useCallback } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ForgotPasswordStore from 'stores/ForgotPasswordStore'
import Loading from 'components/commons/Loading'
import Input from 'components/commons/Input'
import Button from 'components/commons/Button'
import SuccessMessage from 'components/commons/SuccessMessage'
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

  const { isLoading, sendSuccess, serverError, email } = forgotPasswordStore

  if (isLoading) {
    return <Loading loadingRing />
  }

  if (sendSuccess) {
    return (
      <SuccessMessage title={t('sendEmailSuccessfully')} message={t('textEmailSuccessfully')} />
    )
  }

  return (
    <div className={styles.centerForgotPassword}>
      <div className={styles.title}>{t('title')}</div>
      <div className={styles.inputForm}>
        {sendSuccess && <div className={styles.successEmail}>{t('goToEmail')}</div>}
        {serverError && <div className={styles.error}>{t('emailError')}</div>}
        <Input
          isEdit
          canEdit
          type="email"
          inputStore={email}
          value={email.value}
          handleChange={handleChangeEmail}
          placeholder={t('emailPlaceHolder')}
        />
      </div>
      <div className={styles.buttonForgotPassword}>
        <Button handleClick={sendEmail} bigButton text={t('changePassword')} />
      </div>
      <div className={styles.forgotPassword}>
        <Link to="login" className={styles.textSignIn}>
          {t('login')}
        </Link>
      </div>
    </div>
  )
}

export default observer(FormForgotPassword)
