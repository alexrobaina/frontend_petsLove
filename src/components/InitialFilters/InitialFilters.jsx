import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react'
import { MdSearch } from 'react-icons/md'
import InputSelect from 'components/commons/InputSelect'
import GoogleAutocomplete from 'components/commons/GoogleAutocomplete/GoogleAutocomplete'
import FilterSearchPetsStore from 'stores/FilterSearchPetsStore'
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
            value={textAddress.value}
            inputStoreError={textAddress}
            label={t('labelGoogleAutocomplete')}
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
            label={t('common:typeOfPet')}
            placeholder={t('category')}
            handleChange={handleChanceCategory}
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
            options={[
              { value: '', label: t('searchAllCategory') },
              { value: 'female', label: t('common:female') },
              { value: 'male', label: t('common:male') },
            ]}
          />
        </div>
        <div className={styles.btnSearch}>
          <Button
            type="button"
            styleButton="primary"
            text={t('common:search')}
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
