import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Input from '../commons/Input'
import Button from '../commons/Button'
import ButtonLoginSocialMedia from '../commons/ButtonLoginSocialMedia'
import styles from './formLogin.scss'

const FormLogin = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.login}>
      <div className={styles.centerLogin}>
        <div className={styles.title}>{t('login.login')}</div>
        <div className={styles.inputForm}>
          <Input placeholder={t('login.email')} />
        </div>
        <div className={styles.inputForm}>
          <Input placeholder={t('login.password')} />
        </div>
        <div className={styles.buttonLogin}>
          <Button bigButton text={t('login.titleLogin')} />
        </div>
        <div className={styles.buttonSocialLogin}>
          <ButtonLoginSocialMedia textButton="Facebook" socialButton="facebook" />
          <ButtonLoginSocialMedia textButton="Google" socialButton="google" />
        </div>
        <div className={styles.forgotPassword}>
          <Link to="forgot-password" className={styles.textForgot}>
            {t('login.forgotPassword')}
          </Link>
          <Link to="register" className={styles.textSingIn}>
            {t('login.singIn')}
          </Link>
        </div>
      </div>
    </div>
  )
}

// FormLogin.propTypes = {}

export default FormLogin
