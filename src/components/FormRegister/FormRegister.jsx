import React, { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import Input from 'components/commons/Input'
import Button from 'components/commons/Button'
import ButtonLoginSocialMedia from 'components/commons/ButtonLoginSocialMedia'
import InputSelect from 'components/commons/InputSelect'
import styles from './formRegister.scss'

const FormRegister = ({ registerStore }) => {
  const { t } = useTranslation()
  const history = useHistory()

  const handleTypeRol = useCallback(selectedValue => {
    registerStore.setUserRol(selectedValue)
  })

  const handleName = useCallback(e => {
    registerStore.setName(e.target.value)
  })

  const handleEmail = useCallback(e => {
    registerStore.setEmail(e.target.value)
  })

  const handlePassword = useCallback(e => {
    registerStore.setPassword(e.target.value)
  })

  const handleConfirmPassword = useCallback(e => {
    registerStore.setConfirmPassword(e.target.value)
  })

  const handleCreateUser = useCallback(() => {
    registerStore.createUser()
    history.push(`/dashboard`)
  })

  useEffect(() => {
    registerStore.getRols()
  }, [])

  return (
    <div className={styles.register}>
      <div className={styles.centerRegister}>
        <div className={styles.title}>{t('register.singIn')}</div>
        <div className={styles.inputForm}>
          <Input handleChange={handleName} placeholder={t('register.name')} />
        </div>
        <div className={styles.inputForm}>
          <Input handleChange={handleEmail} placeholder={t('register.email')} />
        </div>
        <div className={styles.inputForm}>
          <Input handleChange={handlePassword} placeholder={t('register.password')} />
        </div>
        <div className={styles.inputForm}>
          <Input handleChange={handleConfirmPassword} placeholder={t('register.confirmPassword')} />
          {registerStore.passwordError && (
            <div className={styles.errorMessage}>{t('register.errorMessage')}</div>
          )}
          {registerStore.passwordSuccess && (
            <div className={styles.successMessage}>{t('register.successMessage')}</div>
          )}
        </div>
        <div className={styles.inputForm}>
          <InputSelect
            options={registerStore.rols}
            handleChange={handleTypeRol}
            placeholder={t('register.typeUser')}
          />
        </div>
        <div className={styles.buttonRegister}>
          <Button handleClick={handleCreateUser} bigButton text={t('register.singIn')} />
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
        <div className={styles.inputForm}>{t('register.terms')}</div>
      </div>
    </div>
  )
}

FormRegister.propTypes = {}

export default observer(FormRegister)
