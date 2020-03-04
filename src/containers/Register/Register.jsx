import React, { useCallback } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { Link } from 'react-router-dom'
import Input from 'components/commons/Input'
import Button from 'components/commons/Button'
import OptionsSelectsStore from 'stores/OptionsSelectsStore'
import SearchPetsStore from 'stores/SearchPetsStore'
import Navbar from 'components/commons/Navbar'
import ButtonLoginSocialMedia from 'components/commons/ButtonLoginSocialMedia'
import LayoutContainer from 'components/commons/LayoutContainer'
import ListPets from 'components/ListPets'
import ErrorMessage from 'components/commons/ErrorMessage'
import Footer from 'components/commons/Footer/Footer'
import catImage from './imageCat.jpg'
import styles from './register.scss'

const Register = () => {
  const optionsSelectsStore = useLocalStore(() => new OptionsSelectsStore())
  const searchPetsStore = useLocalStore(() => new SearchPetsStore())

  const deleteFilter = useCallback((selectedValue, typeFilter) => {
    searchPetsStore.deleteFilter(selectedValue, typeFilter)
  })

  return (
    <>
      <Navbar optionsSelectsStore={optionsSelectsStore} searchPetsStore={searchPetsStore} />
      {!searchPetsStore.pets ? (
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
                <Link to="/login" className={styles.textForgot}>
                  Go to Login
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

export default observer(Register)
