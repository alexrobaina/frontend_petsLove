import React, { useCallback, useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Input from 'components/commons/Input'
import Button from 'components/commons/Button'
import UserContext from 'Context/UserContext'
// import ButtonLoginSocialMedia from 'components/commons/ButtonLoginSocialMedia'
import Loading from 'components/commons/Loading/Loading'
import styles from './formLogin.scss'

const FormLogin = () => {
  const rootStore = useContext(UserContext)
  const { t } = useTranslation('signIn')
  const history = useHistory()

  const handleEmail = useCallback(e => {
    rootStore.authStore.setEmail(e.target.value)
  })

  const handlePassword = useCallback(e => {
    rootStore.authStore.setPassword(e.target.value)
  })

  const login = useCallback(() => {
    rootStore.authStore.loginUser()
  })

  useEffect(() => {
    if (rootStore.authStore.isLogin) {
      history.push('/dashboard')
    }
  }, [rootStore.authStore.isLogin])

  const { isLoading, isErrorLogin, email, password } = rootStore.authStore

  return (
    <div className={styles.login}>
      {isLoading ? (
        <Loading loadingRing />
      ) : (
        <div className={styles.centerLogin}>
          <div className={styles.title}>{t('login.login')}</div>
          {isErrorLogin && <div className={styles.errorLogin}>{t('login.errorLogin')}</div>}
          <div className={styles.inputForm}>
            <Input
              isEdit
              type="text"
              value={email.value}
              handleChange={handleEmail}
              placeholder={t('login.email')}
            />
          </div>
          <div className={styles.inputForm}>
            <Input
              isEdit
              type="password"
              value={password.value}
              handleChange={handlePassword}
              placeholder={t('login.password')}
            />
          </div>
          <div className={styles.buttonLogin}>
            <Button handleClick={login} bigButton text={t('login.login')} />
          </div>
          {/* <div className={styles.buttonSocialLogin}> */}
          {/*  <ButtonLoginSocialMedia textButton="Facebook" socialButton="facebook" /> */}
          {/*  <ButtonLoginSocialMedia textButton="Google" socialButton="google" /> */}
          {/* </div> */}
          <div className={styles.forgotPassword}>
            <Link to="forgot-password" className={styles.textForgot}>
              {t('login.forgotPassword')}
            </Link>
            <Link to="register" className={styles.textSingIn}>
              {t('login.signUp')}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default observer(FormLogin)
