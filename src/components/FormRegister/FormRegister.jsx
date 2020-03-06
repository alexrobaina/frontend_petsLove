import React from 'react'
// import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Input from 'components/commons/Input'
import Button from 'components/commons/Button'
import ButtonLoginSocialMedia from 'components/commons/ButtonLoginSocialMedia'
import styles from './formRegister.scss'

const FormRegister = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.register}>
      <div className={styles.centerRegister}>
        <div className={styles.title}>{t('register.singIn')}</div>
        <div className={styles.inputForm}>
          <Input placeholder={t('register.name')} />
        </div>
        <div className={styles.inputForm}>
          <Input placeholder={t('register.email')} />
        </div>
        <div className={styles.inputForm}>
          <Input placeholder={t('register.password')} />
        </div>
        <div className={styles.inputForm}>
          <Input placeholder={t('confirmPassword')} />
        </div>
        <div className={styles.buttonRegister}>
          <Button bigButton text={t('register.singIn')} />
        </div>
        <div className={styles.buttonSocialRegister}>
          <ButtonLoginSocialMedia textButton="Facebook" socialButton="facebook" />
          <ButtonLoginSocialMedia textButton="Google" socialButton="google" />
        </div>
        <div className={styles.forgotPassword}>
          <Link to="/login" className={styles.textForgot}>
            {t('register.login')}
          </Link>
        </div>
      </div>
    </div>
  )
}

// FormRegister.propTypes = {}

export default FormRegister
