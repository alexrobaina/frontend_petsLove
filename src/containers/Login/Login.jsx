import React, { useCallback } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { Link } from 'react-router-dom'
import Input from 'components/commons/Input'
import Button from 'components/commons/Button'
import ButtonLoginSocialMedia from 'components/commons/ButtonLoginSocialMedia'
import OptionsSelectsStore from 'stores/OptionsSelectsStore'
import SearchPetsStore from 'stores/SearchPetsStore'
import Navbar from 'components/commons/Navbar'
import LayoutContainer from 'components/commons/LayoutContainer'
import ListPets from 'components/ListPets'
import ErrorMessage from 'components/commons/ErrorMessage'
import Footer from 'components/commons/Footer/Footer'
import catImage from './photo-1526336024174-e58f5cdd8e13.jpeg'
import styles from './login.scss'

const Login = () => {
  const optionsSelectsStore = useLocalStore(() => new OptionsSelectsStore())
  const searchPetsStore = useLocalStore(() => new SearchPetsStore())

  const deleteFilter = useCallback((selectedValue, typeFilter) => {
    searchPetsStore.deleteFilter(selectedValue, typeFilter)
  })

  return (
    <>
      <Navbar optionsSelectsStore={optionsSelectsStore} searchPetsStore={searchPetsStore} />
      {!searchPetsStore.pets ? (
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
      ) : (
        <LayoutContainer>
          <div className="animationOpacity">
            <ListPets
              handleDelete={deleteFilter}
              filters={searchPetsStore.filters}
              pets={searchPetsStore.pets}
              isLoading={searchPetsStore.isLoading}
            />
          </div>
        </LayoutContainer>
      )}
      {searchPetsStore.isError && (
        <ErrorMessage text="No pets found, Change filters" typeMessage="warning" />
      )}
      <Footer />
    </>
  )
}

export default observer(Login)
