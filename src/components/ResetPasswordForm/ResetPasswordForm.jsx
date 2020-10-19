import { observer, useLocalStore } from 'mobx-react'
import React, { useCallback, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import ForgotPasswordStore from 'stores/ForgotPasswordStore'
import { useTranslation } from 'react-i18next'
import Input from 'components/commons/Input'
import UserContext from 'Context/UserContext'
import Button from 'components/commons/Button'
import Loading from 'components/commons/Loading'
import styles from './resetPasswordForm.scss'

const ResetPasswordForm = () => {
  const forgotPasswordStore = useLocalStore(() => new ForgotPasswordStore())
  const history = useHistory()
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore
  const { token } = useParams()

  const { t } = useTranslation('resetPassword')

  const goToLogin = useCallback(() => {
    history.push('/')
    history.push('/login')
  })

  const handleChangePassword = useCallback(e => {
    forgotPasswordStore.setPassword(e.target.value)
  })

  const handleChangeRepeatPassword = useCallback(e => {
    forgotPasswordStore.setConfirmPassword(e.target.value)
  })

  const SubmitResetPassword = useCallback(() => {
    forgotPasswordStore.resetPassword(token, authStore.user)
  })

  if (forgotPasswordStore.isLoading) {
    return <Loading loadingRing />
  }

  return (
    <div className={styles.centerForgotPassword}>
      <div className={styles.title}>{t('resetPassword')}</div>
      <div className={styles.inputForm}>
        {forgotPasswordStore.isReset && (
          <div className={styles.successPassword}>{t('isReset')}</div>
        )}
        {forgotPasswordStore.passwordError && (
          <div className={styles.successPassword}>{t('successPassword')}</div>
        )}
        <div className={styles.inputForm}>
          <Input
            isEdit
            canEdit
            type="password"
            placeholder={t('resetPassword')}
            handleChange={handleChangePassword}
            inputStore={forgotPasswordStore.password}
          />
        </div>
        {forgotPasswordStore.passwordError && (
          <div className={styles.error}>{t('errorPassword')}</div>
        )}
        <div className={styles.inputForm}>
          <Input
            isEdit
            canEdit
            type="password"
            placeholder={t('repeatPassword')}
            handleChange={handleChangeRepeatPassword}
            inputStore={forgotPasswordStore.confirmPassword}
          />
        </div>
      </div>
      <div className={styles.buttonForgotPassword}>
        <Button handleClick={SubmitResetPassword} bigButton text={t('change')} />
      </div>
      <div className={styles.forgotPassword}>
        <div onClick={goToLogin} className={styles.textSignIn}>
          {t('login')}
        </div>
      </div>
    </div>
  )
}

export default observer(ResetPasswordForm)
