import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import Input from 'components/commons/Input'
import Button from 'components/commons/Button'
import ButtonLoginSocialMedia from 'components/commons/ButtonLoginSocialMedia'
import InputSelect from 'components/commons/InputSelect'
import Loading from 'components/commons/Loading/Loading'
import styles from './formRegister.scss'

const FormRegister = ({ registerStore }) => {
  const { t } = useTranslation('formRegister')
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
  })

  useEffect(() => {
    registerStore.getRols()

    if (registerStore.isRegister) {
      history.push(`/login`)
    }
  }, [registerStore.isRegister])

  return (
    <div className={styles.register}>
      <div className={styles.centerRegister}>
        <div className={styles.title}>{t('singIn')}</div>
        {registerStore.isloading ? (
          <Loading small />
        ) : (
          <>
            <div className={styles.inputForm}>
              <Input canEdit isEdit handleChange={handleName} placeholder={t('name')} />
            </div>
            <div className={styles.inputForm}>
              <Input canEdit isEdit handleChange={handleEmail} placeholder={t('email')} />
            </div>
            <div className={styles.inputForm}>
              <Input canEdit isEdit handleChange={handlePassword} placeholder={t('password')} />
            </div>
            <div className={styles.inputForm}>
              <Input
                canEdit
                isEdit
                handleChange={handleConfirmPassword}
                placeholder={t('confirmPassword')}
              />
              {registerStore.passwordError && (
                <div className={styles.errorMessage}>{t('errorMessage')}</div>
              )}
              {registerStore.passwordSuccess && (
                <div className={styles.successMessage}>{t('successMessage')}</div>
              )}
            </div>
            <div className={styles.inputForm}>
              <InputSelect
                options={registerStore.rols}
                handleChange={handleTypeRol}
                placeholder={t('typeUser')}
              />
            </div>
            <div className={styles.buttonRegister}>
              <Button handleClick={handleCreateUser} bigButton text={t('singIn')} />
            </div>
            <div className={styles.buttonSocialRegister}>
              <ButtonLoginSocialMedia textButton="Facebook" socialButton="facebook" />
              <ButtonLoginSocialMedia textButton="Google" socialButton="google" />
            </div>
            <div className={styles.forgotPassword}>
              <Link to="/login" className={styles.textForgot}>
                {t('login')}
              </Link>
            </div>
            <div className={styles.inputForm}>{t('terms')}</div>
          </>
        )}
      </div>
    </div>
  )
}

FormRegister.propTypes = {
  registerStore: PropTypes.node.isRequired,
}

export default observer(FormRegister)
