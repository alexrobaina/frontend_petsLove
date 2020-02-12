import React from 'react'
import { Link } from 'react-router-dom'
import Input from 'components/commons/Input'
import Button from 'components/commons/Button'
import ButtonLoginSocialMedia from 'components/commons/ButtonLoginSocialMedia'
import catImage from './imageCat.jpg'
import styles from './login.scss'

const Login = () => {
  return (
    <div className={styles.containerLogin}>
      <div className={styles.imageInformationLogin}>
        <img className={styles.imageInformation} src={catImage} alt="cats-login" />
      </div>
      <div className={styles.login}>
        <div className={styles.centerLogin}>
          <div className={styles.title}>Login</div>
          <div className={styles.inputForm}>
            <Input placeholder="Email" />
          </div>
          <div className={styles.inputForm}>
            <Input placeholder="Password" />
          </div>
          <div className={styles.buttonLogin}>
            <Button bigButton text="Login" />
          </div>
          <div className={styles.buttonSocialLogin}>
            <ButtonLoginSocialMedia textButton="Facebook" socialButton="facebook" />
            <ButtonLoginSocialMedia textButton="Google" socialButton="google" />
          </div>
          <div className={styles.forgotPassword}>
            <Link to="forgot-password" className={styles.textForgot}>
              Forgot password
            </Link>
            <Link to="register" className={styles.textSingIn}>
              Sing In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
