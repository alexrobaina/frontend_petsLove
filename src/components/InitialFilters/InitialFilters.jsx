import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { MdSearch } from 'react-icons/md'
import SearchPetsStore from 'stores/SearchPetsStore'
import InputSelect from 'components/commons/InputSelect'
import ListPets from 'components/ListPets'
import Button from 'components/commons/Button'
import Loading from 'components/commons/Loading'
import styles from './initialFilters.scss'

const InitialFilters = ({ searchPetsStore }) => {
  const { t } = useTranslation('home')

  const handleChangeCountry = useCallback(selectedValue => {
    searchPetsStore.setCountry(selectedValue)
  })

  const handleChanceCity = useCallback(selectedValue => {
    searchPetsStore.setCity(selectedValue)
  })

  const handleChanceCategory = useCallback(selectedValue => {
    searchPetsStore.setCategory(selectedValue)
  })

  const handleChanceGender = useCallback(selectedValue => {
    searchPetsStore.setGender(selectedValue)
  })

  const handleSearch = () => {
    searchPetsStore.searchPets()
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.selectCountry}>
          <InputSelect
            isClearable
            placeholder={t('country')}
            handleChange={handleChangeCountry}
            inputStore={searchPetsStore.country}
            options={[
              { value: 'argentina', label: 'Argentina' },
              { value: 'colombia', label: 'Colombia' },
              { value: 'venezuela', label: 'Venezuela' },
            ]}
          />
        </div>
        <div className={styles.selectCity}>
          <InputSelect
            isClearable
            placeholder={t('city')}
            handleChange={handleChanceCity}
            inputStore={searchPetsStore.city}
            options={searchPetsStore.optionsCities}
          />
        </div>
        <div className={styles.selectCategory}>
          <InputSelect
            isClearable
            placeholder={t('category')}
            handleChange={handleChanceCategory}
            inputStore={searchPetsStore.category}
            options={[
              { value: 'dog', label: t('dogs') },
              { value: 'cat', label: t('cats') },
            ]}
          />
        </div>
        <div className={styles.selectGender}>
          <InputSelect
            isClearable
            placeholder={t('gender')}
            handleChange={handleChanceGender}
            inputStore={searchPetsStore.gender}
            options={[
              { value: 'female', label: t('female') },
              { value: 'male', label: t('male') },
            ]}
          />
        </div>
        <div className={styles.btnSearch}>
          <Button
            icon={<MdSearch size={18} />}
            handleClick={handleSearch}
            type="button"
            styleButton="primary"
            text={t('search')}
          />
        </div>
        {searchPetsStore.isLoading ? (
          <Loading loadingRing />
        ) : (
          <>{searchPetsStore.pets.length > 0 && <ListPets pets={searchPetsStore.pets} />}</>
        )}
      </div>
    </div>
  )
}

InitialFilters.Prototypes = {
  searchPetsStore: PropTypes.instanceOf(SearchPetsStore).isRequired,
}

export default observer(InitialFilters)
