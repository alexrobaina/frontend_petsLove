import React from 'react'
import { Link } from 'react-router-dom'
import Input from 'components/commons/Input'
import Button from 'components/commons/Button'
import catImage from './imageCat.jpg'
import styles from './forgotPassword.scss'

const ForgotPassword = () => {
  return (
    <div className={styles.containerForgotPassword}>
      <div className={styles.imageInformationForgotPassword}>
        <img className={styles.imageInformation} src={catImage} alt="cats-login" />
      </div>
      <div className={styles.containerForm}>
        <div className={styles.centerForgotPassword}>
          <div className={styles.title}>Forgot password</div>
          <div className={styles.inputForm}>
            <Input placeholder="Enter your email" />
          </div>
          <div className={styles.buttonForgotPassword}>
            <Button bigButton text="Change password" />
          </div>
          <div className={styles.forgotPassword}>
            <Link to="login" className={styles.textSingIn}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
