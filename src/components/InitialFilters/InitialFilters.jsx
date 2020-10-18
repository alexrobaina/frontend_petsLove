import React, { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react'
import InputSelect from 'components/commons/InputSelect'
import GoogleAutocomplete from 'components/commons/GoogleAutocomplete/GoogleAutocomplete'
import FilterSearchPetsStore from 'stores/FilterSearchPetsStore'
import PetsFiltered from 'containers/PetsFiltered'
import styles from './initialFilters.scss'

const InitialFilters = () => {
  const inputRef = useRef()
  const filterSearchPetsStore = useLocalStore(() => new FilterSearchPetsStore())
  const { t } = useTranslation('search')

  const handleChanceCategory = useCallback(selectedValue => {
    filterSearchPetsStore.setCategory(selectedValue.value)
  })

  const handleChanceGender = useCallback(selectedValue => {
    filterSearchPetsStore.setGender(selectedValue.value)
  })

  const handleChangeTextAddress = useCallback(address => {
    filterSearchPetsStore.setTextAddress(address)
  })

  const handleChangeAddressComponents = useCallback(addressComponent => {
    filterSearchPetsStore.setAddressComponents(addressComponent)
  })

  const handleSearch = () => {
    filterSearchPetsStore.searchPets(10, 1)
  }

  const search = () => {
    handleSearch()
  }

  const keyPressedHandle = event => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const { textAddress, category, gender } = filterSearchPetsStore

  return (
    <div>
      <div className={styles.containerGoogleAutocomplete}>
        <div className={styles.googleAutocomplete}>
          <GoogleAutocomplete
            isEdit
            ref={inputRef}
            search={search}
            value={textAddress.value}
            inputStoreError={textAddress}
            label={t('labelGoogleAutocomplete')}
            placeholder={t('placeholderGoogleAutocomplete')}
            handleChangeTextAddress={handleChangeTextAddress}
            handleChangeAddressComponents={handleChangeAddressComponents}
          />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.selectCategory}>
          <InputSelect
            isEdit
            inputStore={category}
            value={category.value}
            placeholder={t('category')}
            label={t('common:typeOfPet')}
            handleChange={handleChanceCategory}
            handleKeyPressed={keyPressedHandle}
            options={[
              { value: '', label: t('searchAllCategory') },
              { value: 'dog', label: t('common:dogs') },
              { value: 'cat', label: t('common:cats') },
              { value: 'exotic', label: t('common:exotic') },
            ]}
          />
        </div>
        <div className={styles.selectGender}>
          <InputSelect
            isEdit
            inputStore={gender}
            value={gender.value}
            label={t('common:sex')}
            placeholder={t('common:sex')}
            handleChange={handleChanceGender}
            handleKeyPressed={event => keyPressedHandle(event)}
            options={[
              { value: '', label: t('searchAllCategory') },
              { value: 'female', label: t('common:female') },
              { value: 'male', label: t('common:male') },
            ]}
          />
        </div>
      </div>
      <PetsFiltered store={filterSearchPetsStore} />
    </div>
  )
}

export default observer(InitialFilters)
