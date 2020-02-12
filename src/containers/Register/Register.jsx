import React from 'react'
import { Link } from 'react-router-dom'
import Input from 'components/commons/Input'
import Button from 'components/commons/Button'
import ButtonLoginSocialMedia from 'components/commons/ButtonLoginSocialMedia'
import catImage from './imageCat.jpg'
import styles from './register.scss'

const Register = () => {
  return (
    <div className={styles.containerRegister}>
      <div className={styles.imageInformationRegister}>
        <img className={styles.imageInformation} src={catImage} alt="cats-login" />
      </div>
      <div className={styles.register}>
        <div className={styles.centerRegister}>
          <div className={styles.title}>Register</div>
          <div className={styles.inputForm}>
            <Input placeholder="Name" />
          </div>
          <div className={styles.inputForm}>
            <Input placeholder="Email" />
          </div>
          <div className={styles.inputForm}>
            <Input placeholder="Password" />
          </div>
          <div className={styles.inputForm}>
            <Input placeholder="Confirm password" />
          </div>
          <div className={styles.buttonRegister}>
            <Button bigButton text="Register" />
          </div>
          <div className={styles.buttonSocialRegister}>
            <ButtonLoginSocialMedia textButton="Facebook" socialButton="facebook" />
            <ButtonLoginSocialMedia textButton="Google" socialButton="google" />
          </div>
          <div className={styles.forgotPassword}>
            <Link to="/login" className={styles.textForgot}>Go to Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
