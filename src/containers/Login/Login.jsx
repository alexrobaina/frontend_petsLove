import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react'
import OptionsSelectsStore from 'stores/OptionsSelectsStore'
import SearchPetsStore from 'stores/SearchPetsStore'
import Navbar from 'components/commons/Navbar'
import ListPets from 'components/ListPets'
import ErrorMessage from 'components/commons/ErrorMessage'
import ImageInformationLeft from 'components/commons/ImageInformationLeft'
import FormLogin from 'components/FormLogin'
import catImage from './photo-1526336024174-e58f5cdd8e13.jpeg'
import styles from './login.scss'

const Login = () => {
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
        <div className={styles.containerLogin}>
          <ImageInformationLeft image={catImage} />
          <FormLogin />
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

export default observer(Login)
