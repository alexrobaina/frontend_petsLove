import React from 'react'
import ImageInformationLeft from 'components/commons/ImageInformationLeft'
import ResetPasswordForm from 'components/ResetPasswordForm/ResetPasswordForm'
import LayoutTrantitions from 'components/commons/LayoutTrantitions'
import catImage from './Screen Shot 2020-04-30 at 22.50.13.png'
import styles from './resetPassword.scss'

const ResetPassword = () => {
  return (
    <LayoutTrantitions>
      <div className={styles.containerForgotPassword}>
        <ImageInformationLeft image={catImage} />
        <div className={styles.containerForm}>
          <ResetPasswordForm />
        </div>
      </div>
    </LayoutTrantitions>
  )
}

export default ResetPassword
