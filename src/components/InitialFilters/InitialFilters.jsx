import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react'
import { MdSearch } from 'react-icons/md'
import FilterPetsStore from 'stores/FilterPetsStore'
import InputSelect from 'components/commons/InputSelect'
import Button from 'components/commons/Button'
import PetsFiltered from 'containers/PetsFiltered/PetsFiltered'
import styles from './initialFilters.scss'

const InitialFilters = () => {
  const filterPetsStore = useLocalStore(() => new FilterPetsStore())

  const { t } = useTranslation('home')

  const handleChangeCountry = useCallback(selectedValue => {
    filterPetsStore.setCountry(selectedValue.value)
  })

  const handleChanceCity = useCallback(selectedValue => {
    filterPetsStore.setCity(selectedValue.value)
  })

  const handleChanceCategory = useCallback(selectedValue => {
    filterPetsStore.setCategory(selectedValue.value)
  })

  const handleChanceGender = useCallback(selectedValue => {
    filterPetsStore.setGender(selectedValue.value)
  })

  const handleSearch = () => {
    filterPetsStore.searchPets(6, 1)
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.selectCountry}>
          <InputSelect
            isEdit
            placeholder={t('country')}
            handleChange={handleChangeCountry}
            inputStore={filterPetsStore.country}
            value={filterPetsStore.country.value}
            options={[
              { value: 'argentina', label: 'Argentina' },
              { value: 'colombia', label: 'Colombia' },
              { value: 'venezuela', label: 'Venezuela' },
            ]}
          />
        </div>
        <div className={styles.selectCity}>
          <InputSelect
            isEdit
            placeholder={t('city')}
            handleChange={handleChanceCity}
            inputStore={filterPetsStore.city}
            value={filterPetsStore.city.value}
            options={filterPetsStore.optionsCities}
          />
        </div>
        <div className={styles.selectCategory}>
          <InputSelect
            isEdit
            placeholder={t('category')}
            handleChange={handleChanceCategory}
            inputStore={filterPetsStore.category}
            value={filterPetsStore.category.value}
            options={[
              { value: 'dog', label: t('dogs') },
              { value: 'cat', label: t('cats') },
            ]}
          />
        </div>
        <div className={styles.selectGender}>
          <InputSelect
            isEdit
            placeholder={t('gender')}
            handleChange={handleChanceGender}
            inputStore={filterPetsStore.gender}
            value={filterPetsStore.gender.value}
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
      <PetsFiltered store={filterPetsStore} />
    </div>
  )
}

export default observer(InitialFilters)
