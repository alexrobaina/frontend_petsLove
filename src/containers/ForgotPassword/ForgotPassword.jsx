import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocalStore } from 'mobx-react'
import ImageInformationLeft from 'components/commons/ImageInformationLeft'
import Navbar from 'components/commons/Navbar'
import FormForgotPassword from 'components/FormForgotPassword'
import OptionsSelectsStore from 'stores/OptionsSelectsStore'
import SearchPetsStore from 'stores/SearchPetsStore'
import ListPets from 'components/ListPets'
import ErrorMessage from 'components/commons/ErrorMessage'
import catImage from './imageCat.jpg'
import styles from './forgotPassword.scss'

const ForgotPassword = () => {
  const { t } = useTranslation()
  const optionsSelectsStore = useLocalStore(() => new OptionsSelectsStore())
  const searchPetsStore = useLocalStore(() => new SearchPetsStore())

  const deleteFilter = useCallback((selectedValue, typeFilter) => {
    searchPetsStore.deleteFilter(selectedValue, typeFilter)
  })

  return (
    <>
      <Navbar optionsSelectsStore={optionsSelectsStore} searchPetsStore={searchPetsStore} />
      {!searchPetsStore.pets ? (
        <div className={styles.containerForgotPassword}>
          <ImageInformationLeft image={catImage} />
          <div className={styles.containerForm}>
            <FormForgotPassword />
          </div>
        </div>
      ) : (
        <ListPets
          handleDelete={deleteFilter}
          filters={searchPetsStore.filters}
          pets={searchPetsStore.pets}
          isLoading={searchPetsStore.isLoading}
        />
      )}
      {searchPetsStore.isError && <ErrorMessage text={t('errorMessage')} typeMessage="warning" />}
    </>
  )
}

export default ForgotPassword
