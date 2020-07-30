import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react'
import { MdSearch } from 'react-icons/md'
import InputSelect from 'components/commons/InputSelect'
import GoogleAutocomplete from 'components/commons/GoogleAutocomplete/GoogleAutocomplete'
import FilterSearchPetsStore from "stores/FilterSearchPetsStore";
import Button from 'components/commons/Button'
import PetsFiltered from 'containers/PetsFiltered'
import styles from './initialFilters.scss'

const InitialFilters = () => {
  const filterSearchPetsStore = useLocalStore(() => new FilterSearchPetsStore())

  const { t } = useTranslation('home')

  const handleChanceCategory = useCallback(selectedValue => {
    filterSearchPetsStore.setCategory(selectedValue.value)
  })

  const handleChanceGender = useCallback(selectedValue => {
    filterSearchPetsStore.setGender(selectedValue.value)
  })

  const handleChangeAddress = useCallback(address => {
    console.log(address);
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
  
  const { textAddress, category, gender } = filterSearchPetsStore
  
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.googleAutocomplete}>
          <GoogleAutocomplete
            isEdit
            label={t('labelGoogleAutocomplete')}
            value={textAddress.value}
            inputStoreError={textAddress}
            handleChangeAddress={handleChangeAddress}
            placeholder={t('placeholderGoogleAutocomplete')}
            handleChangeTextAddress={handleChangeTextAddress}
            handleChangeAddressComponents={handleChangeAddressComponents}
          />
        </div>
        <div className={styles.selectCategory}>
          <InputSelect
            isEdit
            inputStore={category}
            value={category.value}
            placeholder={t('category')}
            handleChange={handleChanceCategory}
            options={[
              { value: 'dog', label: t('dogs') },
              { value: 'cat', label: t('cats') },
            ]}
          />
        </div>
        <div className={styles.selectGender}>
          <InputSelect
            isEdit
            inputStore={gender}
            value={gender.value}
            placeholder={t('gender')}
            handleChange={handleChanceGender}
            options={[
              { value: 'female', label: t('female') },
              { value: 'male', label: t('male') },
            ]}
          />
        </div>
        <div className={styles.btnSearch}>
          <Button
            type="button"
            text={t('search')}
            styleButton="primary"
            handleClick={handleSearch}
            icon={<MdSearch size={18} />}
          />
        </div>
      </div>
      <PetsFiltered store={filterSearchPetsStore} />
    </div>
  )
}

export default observer(InitialFilters)
