import React, { useCallback, useEffect } from 'react'
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
import ErrorMessage from 'components/commons/ErrorMessage'
import LayoutTrantitions from 'components/commons/LayoutTrantitions'
import ImageInformationLeft from 'components/commons/ImageInformationLeft'
import LayoutLogin from 'components/commons/LayoutLogin'
import fidelImage from './Screen Shot 2020-05-09 at 12.00.50.png'
import styles from './formRegisterStepOne.scss'

const FormRegisterStepOne = ({ registerStore }) => {
  const history = useHistory()
  const { t } = useTranslation('formRegister')

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Required')
      .max(10),
    email: yup
      .string()
      .email()
      .required('Required'),
    password: yup
      .string()
      .required('Required')
      .min(8, 'Password is too short - should be 8 caracters minimum')
      .matches(/(?=.*[0-9])/, 'Password must contain a number')
      .matches(/(?=.*[A-Z])/, 'Password must contain a uppercase')
      .matches(/(?=.*[a-a])/, 'Password must contain a lowecase'),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    rol: yup
      .string()
      .ensure()
      .required('Role is required!'),
    username: yup.string().required('Username is required!'),
    phone: yup.number().required('Phone is required!'),
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
            <div className={styles.title}>{t('signIn')}</div>
            {registerStore.isError && (
              <ErrorMessage text="Todos los campos son requeridos" typeMessage="error" />
            )}
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
                        placeholder={t('name')}
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
                        placeholder={t('email')}
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
                        name="username"
                        value={values.username}
                        handleChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={t('User name')}
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
                        placeholder={t('password')}
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
                        title="Please confirm the password"
                        name="passwordConfirm"
                        type="password"
                        placeholder={t('confirmPassword')}
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
                        title="Te gustaría adoptar o quieres ofrecer una mascota en adopción"
                        options={[
                          { value: 'adopter', label: t('adopter') },
                          { value: 'protectionist', label: t('protectionist') },
                        ]}
                        value={values.rol}
                        onBlur={setFieldTouched}
                        error={errors.rol}
                        handleChange={setFieldValue}
                        placeholder={t('typeUser')}
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
                        text={t('register')}
                      />
                    </div>
                    {/* <div className={styles.buttonSocialRegister}> */}
                    {/*   <ButtonLoginSocialMedia textButton="Facebook" socialButton="facebook" /> */}
                    {/*   <ButtonLoginSocialMedia textButton="Google" socialButton="google" /> */}
                    {/* </div> */}
                    <div className={styles.forgotPassword}>
                      <Link to="/login" className={styles.textForgot}>
                        {t('Go To Login')}
                      </Link>
                    </div>
                    <div className={styles.inputForm}>{t('terms')}</div>
                    <Link to="/login" className={styles.textForgot}>
                      {t('Read terms')}
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

FormRegisterStepOne.propTypes = {
  registerStore: PropTypes.node.isRequired,
}

export default observer(FormRegisterStepOne)
