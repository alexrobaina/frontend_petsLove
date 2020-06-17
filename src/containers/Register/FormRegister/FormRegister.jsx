import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { Link, useHistory } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import Input from 'components/commons/Input'
import Button from 'components/commons/Button'
import InputSelect from 'components/commons/InputSelect'
import Loading from 'components/commons/Loading/Loading'
import LayoutTrantitions from 'components/commons/LayoutTrantitions'
import ImageInformationLeft from 'components/commons/ImageInformationLeft'
import LayoutLogin from 'components/commons/LayoutLogin'
import fidelImage from './Screen Shot 2020-05-09 at 12.00.50.png'
import styles from './formRegister.scss'

const FormRegister = ({ registerStore }) => {
  const { t } = useTranslation('signIn')
  const history = useHistory()

  const handleChangeFirstname = useCallback(e => {
    registerStore.setFirstname(e.target.value)
  }, [])

  const handleChangeLastname = useCallback(e => {
    registerStore.setLastname(e.target.value)
  }, [])

  const handleChangeEmail = useCallback(e => {
    registerStore.setEmail(e.target.value)
  }, [])

  const handleChangePassword = useCallback(e => {
    registerStore.setPassword(e.target.value)
  }, [])

  const handleChangePhone = useCallback(phone => {
    registerStore.setPhone(phone)
  }, [])

  const handleChangeUsername = useCallback(e => {
    registerStore.setUsername(e.target.value)
  }, [])

  const handleChangePasswordConfirm = useCallback(e => {
    registerStore.setConfirmPassword(e.target.value)
  }, [])

  const handleChangeRole = useCallback(selectedRole => {
    registerStore.setRole(selectedRole.value)
  }, [])

  const handleSubmit = useCallback(() => {
    registerStore.createUser()
  }, [])

  useEffect(() => {
    if (registerStore.isRegister) {
      history.push('/')
      history.push('/login')
    }
  }, [registerStore.isRegister])

  const { firstname, email, password, role, username, lastname } = registerStore.registerUser

  return (
    <LayoutTrantitions>
      <div className={styles.containerRegister}>
        <ImageInformationLeft image={fidelImage} />
        <div className={styles.register}>
          <LayoutLogin>
            <div className={styles.title}>{t('register.signUp')}</div>
            {registerStore.isloading ? (
              <Loading loadingRing />
            ) : (
              <>
                <div className={styles.inputForm}>
                  <Input
                    isEdit
                    canEdit
                    name="name"
                    inputStore={firstname}
                    value={firstname.value}
                    handleChange={handleChangeFirstname}
                    placeholder={t('register.firstname')}
                  />
                </div>
                <div className={styles.inputForm}>
                  <Input
                    isEdit
                    canEdit
                    name="name"
                    inputStore={lastname}
                    value={lastname.value}
                    handleChange={handleChangeLastname}
                    placeholder={t('register.lastname')}
                  />
                </div>
                <div className={styles.inputForm}>
                  <Input
                    isEdit
                    canEdit
                    name="email"
                    inputStore={email}
                    value={email.value}
                    handleChange={handleChangeEmail}
                    placeholder={t('register.email')}
                  />
                </div>
                <div className={styles.inputForm}>
                  <Input
                    isEdit
                    canEdit
                    type="text"
                    name="username"
                    inputStore={username}
                    value={username.value}
                    title={t('titleUsername')}
                    handleChange={handleChangeUsername}
                    placeholder={t('register.username')}
                  />
                </div>
                <div className={styles.inputForm}>
                  <Input
                    isEdit
                    canEdit
                    name="password"
                    type="password"
                    inputStore={password}
                    value={password.value}
                    handleChange={handleChangePassword}
                    placeholder={t('register.password')}
                  />
                  {registerStore.passwordError && (
                    <div className={styles.errorMessage}>{t('register.errorPassword')}</div>
                  )}
                  {registerStore.passwordSuccess && (
                    <div className={styles.successMessage}>{t('register.successPassword')}</div>
                  )}
                </div>
                <div className={styles.inputForm}>
                  <Input
                    isEdit
                    canEdit
                    type="password"
                    name="passwordConfirm"
                    handleChange={handleChangePasswordConfirm}
                    inputStore={registerStore.passwordConfirm}
                    placeholder={t('register.confirmPassword')}
                    value={registerStore.confirmPassword.value}
                    title={t('register.titleConfirmPassword')}
                  />
                </div>
                <div className={styles.inputForm}>
                  <InputSelect
                    isEdit
                    name="role"
                    needValidate
                    inputStore={role}
                    value={role.value}
                    handleChange={handleChangeRole}
                    placeholder={t('register.selectTypeUser')}
                    options={[
                      { value: 'adopter', label: t('register.typeUserAdopter') },
                      { value: 'protectionist', label: t('register.typeUserProtectionist') },
                      { value: 'transitUser', label: t('register.typeUserTransit') },
                      { value: 'vet', label: t('register.typeUserVet') },
                    ]}
                  />
                </div>
                <div className={styles.inputForm}>
                  <PhoneInput
                    name="phone"
                    country="ar"
                    onChange={phone => handleChangePhone(phone)}
                    inputStyle={{ width: '100%', height: '40px', borderColor: '#ffd95a'  }}
                  />
                </div>
                <div className={styles.buttonRegister}>
                  <Button
                    bigButton
                    type="submit"
                    handleClick={handleSubmit}
                    text={t('register.signUp')}
                  />
                </div>
                {/* <div className={styles.buttonSocialRegister}> */}
                {/*   <ButtonLoginSocialMedia textButton="Facebook" socialButton="facebook" /> */}
                {/*   <ButtonLoginSocialMedia textButton="Google" socialButton="google" /> */}
                {/* </div> */}
                <div className={styles.forgotPassword}>
                  <Link to="/login" className={styles.textForgot}>
                    {t('register.goToLogin')}
                  </Link>
                </div>
                <div className={styles.inputForm}>{t('register.textTerms')}</div>
                <Link to="/login" className={styles.textForgot}>
                  {t('register.readTerm')}
                </Link>
              </>
            )}
          </LayoutLogin>
        </div>
      </div>
    </LayoutTrantitions>
  )
}

FormRegister.propTypes = {
  registerStore: PropTypes.node.isRequired,
}

export default observer(FormRegister)
