import React, { useCallback } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import OptionsSelectsStore from 'stores/OptionsSelectsStore'
import SearchPetsStore from 'stores/SearchPetsStore'
import Navbar from 'components/commons/Navbar'
import ListPets from 'components/ListPets'
import ErrorMessage from 'components/commons/ErrorMessage'
import Footer from 'components/commons/Footer/Footer'
import ImageInformationLeft from 'components/commons/ImageInformationLeft'
import FormRegister from 'components/FormRegister'
import catImage from './imageCat.jpg'
import styles from './register.scss'

const Register = () => {
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
        <div className={styles.containerRegister}>
          <ImageInformationLeft image={catImage} />
          <FormRegister />
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
      <Footer />
    </>
  )
}

export default observer(Register)
