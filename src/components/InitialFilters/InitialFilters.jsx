import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { MdSearch } from 'react-icons/md'
import SearchPetsStore from 'stores/SearchPetsStore'
import InputSelect from 'components/commons/InputSelect'
import Button from 'components/commons/Button'
import PetsFiltered from 'containers/PetsFiltered/PetsFiltered'
import styles from './initialFilters.scss'

const InitialFilters = ({ searchPetsStore }) => {
  const { t } = useTranslation('home')

  const handleChangeCountry = useCallback(selectedValue => {
    searchPetsStore.setCountry(selectedValue.value)
  })

  const handleChanceCity = useCallback(selectedValue => {
    searchPetsStore.setCity(selectedValue.value)
  })

  const handleChanceCategory = useCallback(selectedValue => {
    searchPetsStore.setCategory(selectedValue.value)
  })

  const handleChanceGender = useCallback(selectedValue => {
    searchPetsStore.setGender(selectedValue.value)
  })

  const handleSearch = () => {
    searchPetsStore.searchPets(6, 1)
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.selectCountry}>
          <InputSelect
            isEdit
            placeholder={t('country')}
            handleChange={handleChangeCountry}
            inputStore={searchPetsStore.country}
            value={searchPetsStore.country.value}
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
            inputStore={searchPetsStore.city}
            value={searchPetsStore.city.value}
            options={searchPetsStore.optionsCities}
          />
        </div>
        <div className={styles.selectCategory}>
          <InputSelect
            isEdit
            placeholder={t('category')}
            handleChange={handleChanceCategory}
            inputStore={searchPetsStore.category}
            value={searchPetsStore.category.value}
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
            inputStore={searchPetsStore.gender}
            value={searchPetsStore.gender.value}
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
      <PetsFiltered searchPetsStore={searchPetsStore} />
    </div>
  )
}

InitialFilters.Prototypes = {
  searchPetsStore: PropTypes.instanceOf(SearchPetsStore).isRequired,
}

export default observer(InitialFilters)
