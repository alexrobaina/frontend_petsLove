import React from 'react'
import ImageInformationLeft from 'components/commons/ImageInformationLeft'
import catImage from './imageCat.jpg'
import styles from './forgotPassword.scss'
import FormForgotPassword from '../../components/FormForgotPassword'

const ForgotPassword = () => {
  return (
    <div className={styles.containerForgotPassword}>
      <ImageInformationLeft image={catImage} />
      <div className={styles.containerForm}>
        <FormForgotPassword />
      </div>
    </div>
  )
}

export default ForgotPassword
