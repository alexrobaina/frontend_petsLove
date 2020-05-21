import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'
import { observer } from 'mobx-react'
import { Link, useHistory } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import * as yup from 'yup'
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
  const history = useHistory()
  const { t } = useTranslation('signIn')

  const validationSchema = yup.object({
    name: yup.string().required(t('register.required')),
    email: yup
      .string()
      .email()
      .required(t('register.required')),
    password: yup
      .string()
      .required(t('register.required'))
      .min(8, t('register.shortPasswordMessage'))
      .matches(/(?=.*[0-9])/, t('register.passwordNumber'))
      .matches(/(?=.*[A-Z])/, t('register.passwordUpparcaseMessage'))
      .matches(/(?=.*[a-a])/, t('register.passwordLowercaseMessage')),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref(t('register.password')), null], t('register.passwordMatch')),
    rol: yup
      .string()
      .ensure()
      .required(t('register.roleRequired!')),
    username: yup.string().required(t('register.usernameRequired')),
    phone: yup.number().required(t('register.phoneRequired')),
  })

  useEffect(() => {
    if (registerStore.isRegister) {
      history.push('/')
      history.push('/login')
    }
  }, [registerStore.isRegister])

  return (
    <LayoutTrantitions>
      <div className={styles.containerRegister}>
        <ImageInformationLeft image={fidelImage} />
        <div className={styles.register}>
          <LayoutLogin>
            <div className={styles.title}>{t('register.signUp')}</div>
            {registerStore.isloading ? (
              <Loading small />
            ) : (
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  password: '',
                  rol: '',
                  username: '',
                  phone: '',
                  address: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  registerStore.setForm(values)
                  setTimeout(() => {
                    setSubmitting(true)
                  }, 1000)
                }}
              >
                {({
                  values,
                  touched,
                  errors,
                  isSubmitting,
                  setFieldValue,
                  setFieldTouched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className={styles.inputForm}>
                      <Input
                        name="name"
                        placeholder={t('register.name')}
                        handleChange={handleChange}
                        value={values.name}
                        onBlur={handleBlur}
                        canEdit
                        isEdit
                      />
                      {errors.name && touched.name ? (
                        <div className={styles.errorMessage}>{errors.name}</div>
                      ) : null}
                    </div>
                    <div className={styles.inputForm}>
                      <Input
                        name="email"
                        placeholder={t('register.email')}
                        handleChange={handleChange}
                        value={values.email}
                        onBlur={handleBlur}
                        canEdit
                        isEdit
                      />
                      {errors.email && touched.email ? (
                        <div className={styles.errorMessage}>{errors.email}</div>
                      ) : null}
                    </div>
                    <div className={styles.inputForm}>
                      <Input
                        title={t('titleUsername')}
                        name="username"
                        value={values.username}
                        handleChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={t('register.username')}
                        type="text"
                        canEdit
                        isEdit
                      />
                      {errors.username && touched.username ? (
                        <div className={styles.errorMessage}>{errors.username}</div>
                      ) : null}
                    </div>
                    <div className={styles.inputForm}>
                      <Input
                        name="password"
                        type="password"
                        placeholder={t('register.password')}
                        handleChange={handleChange}
                        value={values.password}
                        onBlur={handleBlur}
                        canEdit
                        isEdit
                      />
                      {errors.password && touched.password ? (
                        <div className={styles.errorMessage}>{errors.password}</div>
                      ) : null}
                    </div>
                    <div className={styles.inputForm}>
                      <Input
                        title={t('register.titleConfirmPassword')}
                        name="passwordConfirm"
                        type="password"
                        placeholder={t('register.confirmPassword')}
                        handleChange={handleChange}
                        value={registerStore.confirmPassword}
                        canEdit
                        isEdit
                      />
                      {errors.passwordConfirm ? (
                        <div className={styles.errorMessage}>{errors.passwordConfirm}</div>
                      ) : null}
                    </div>
                    <div className={styles.inputForm}>
                      <InputSelect
                        needValidate
                        name="rol"
                        options={[
                          { value: 'adopter', label: t('register.typeUserAdopter') },
                          { value: 'protectionist', label: t('register.typeUserProtectionist') },
                          { value: 'transitUser', label: t('register.typeUserTransit') },
                        ]}
                        value={values.rol}
                        onBlur={setFieldTouched}
                        error={errors.rol}
                        handleChange={setFieldValue}
                        placeholder={t('register.selectTypeUser')}
                        isEdit
                      />
                      {errors.rol && touched.rol ? (
                        <div className={styles.errorMessage}>{errors.rol}</div>
                      ) : null}
                    </div>
                    <div className={styles.inputForm}>
                      <PhoneInput
                        name="phone"
                        value={registerStore.registerUser.phone}
                        onChange={phone => setFieldValue('phone', phone)}
                        inputStyle={{ width: '100%' }}
                        country="ar"
                      />
                      {errors.phone && touched.phone ? (
                        <div className={styles.errorMessage}>{errors.phone}</div>
                      ) : null}
                    </div>
                    <div className={styles.buttonRegister}>
                      <Button
                        disable={isSubmitting}
                        type="submit"
                        handleClick={handleSubmit}
                        bigButton
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
                  </form>
                )}
              </Formik>
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
