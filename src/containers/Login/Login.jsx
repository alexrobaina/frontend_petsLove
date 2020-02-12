import React from 'react'
import c from 'classnames'
import Input from 'components/commons/Input'
import Button from 'components/commons/Button'
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
            <button type="button" className={c(styles.googleLogin, styles.btn)}>
              Google
            </button>
            <button type="button" className={c(styles.facebookLogin, styles.btn)}>
              Facebook
            </button>
          </div>
          <div className={styles.forgotPassword}>
            <div className={styles.textForgot}>Forgot password</div>
            <div className={styles.textSingIn}>Sing In</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
