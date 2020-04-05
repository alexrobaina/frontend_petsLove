import React, { useCallback } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import SearchPetsStore from 'stores/SearchPetsStore'
import Navbar from 'components/commons/Navbar'
import ListPets from 'components/ListPets'
import ErrorMessage from 'components/commons/ErrorMessage'
import ImageInformationLeft from 'components/commons/ImageInformationLeft'
import RegisterStore from 'stores/RegisterStore'
import FormRegister from 'components/FormRegister'
import catImage from './imageCat.jpg'
import styles from './register.scss'

const Register = () => {
  const { t } = useTranslation()
  const searchPetsStore = useLocalStore(() => new SearchPetsStore())
  const registerStore = useLocalStore(() => new RegisterStore())

  const deleteFilter = useCallback((selectedValue, typeFilter) => {
    searchPetsStore.deleteFilter(selectedValue, typeFilter)
  })

  return (
    <Navbar>
      {!searchPetsStore.pets ? (
        <div className={styles.containerRegister}>
          <ImageInformationLeft image={catImage} />
          <FormRegister registerStore={registerStore} />
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
    </Navbar>
  )
}

export default observer(Register)
