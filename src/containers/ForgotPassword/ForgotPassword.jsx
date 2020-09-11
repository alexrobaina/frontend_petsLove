import React from 'react'
import FormForgotPassword from 'components/FormForgotPassword'
import LayoutContainer from 'components/commons/LayoutContainer'
import styles from './forgotPassword.scss'

const ForgotPassword = () => {
  return (
    <LayoutContainer>
      <div className={styles.containerForm}>
        <FormForgotPassword />
      </div>
    </LayoutContainer>
  )
}

export default ForgotPassword
