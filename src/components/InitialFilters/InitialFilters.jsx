import React, { useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import anime from 'animejs'
import c from 'classnames'
import InputSelect from 'components/commons/InputSelect'
import ListPets from 'components/ListPets'
import Button from 'components/commons/Button'
import Footer from 'components/commons/Footer/Footer'
import ErrorMessage from 'components/commons/ErrorMessage'
import { MdSearch } from 'react-icons/md'
import styles from './initialFilters.scss'

const InitialFilters = ({ searchPetsStore, optionsSelectsStore }) => {
  const { t } = useTranslation()
  const handleChangeCountrie = useCallback(selectedValue => {
    optionsSelectsStore.setCountry(selectedValue)
    optionsSelectsStore.setOptionsCities(selectedValue)
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

  const deleteFilter = useCallback((selectedValue, typeFilter) => {
    searchPetsStore.deleteFilter(selectedValue, typeFilter)
  })

  useEffect(() => {
    optionsSelectsStore.listContries()
    optionsSelectsStore.listGender()
    optionsSelectsStore.listCategories()
    optionsSelectsStore.listAges()

    anime({
      targets: '.animationOpacity',
      opacity: 1,
      easing: 'linear',
      duration: 1000,
      delay: 3500,
    })
    anime({
      targets: '.animationOpacity',
      opacity: 1,
      easing: 'linear',
      duration: 1000,
      delay: 3500,
    })
  }, [])

  const handleSearch = () => {
    searchPetsStore.searchPets()
  }
  return (
    <div className={c(styles.animationOpacity, 'animationOpacity')}>
      {!searchPetsStore.pets ? (
        <div className={styles.container}>
          <div className={styles.selectCountry}>
            <InputSelect
              placeholder={t('initialFilters.country')}
              handleChange={handleChangeCountrie}
              options={optionsSelectsStore.countries}
              isLoading={optionsSelectsStore.isLoading}
            />
          </div>
          <div className={styles.selectCity}>
            <InputSelect
              placeholder={t('initialFilters.city')}
              options={optionsSelectsStore.cities}
              handleChange={handleChanceCity}
              isLoading={optionsSelectsStore.isLoading}
            />
          </div>
          <div className={styles.selectCategory}>
            <InputSelect
              placeholder={t('initialFilters.category')}
              options={optionsSelectsStore.categories}
              handleChange={handleChanceCategory}
              isLoading={optionsSelectsStore.isLoading}
            />
          </div>
          <div className={styles.selectGender}>
            <InputSelect
              placeholder={t('initialFilters.gender')}
              handleChange={handleChanceGender}
              options={optionsSelectsStore.gender}
              isLoading={optionsSelectsStore.isLoading}
            />
          </div>
          <div className={styles.btnSearch}>
            <Button
              icon={<MdSearch size={18} />}
              handleClick={handleSearch}
              type="button"
              styleButton="primary"
              text={t('initialFilters.search')}
            />
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
      {searchPetsStore.isError && (
        <ErrorMessage text={t('common.errorMessage')} typeMessage="warning" />
      )}
      <Footer />
    </div>
  )
}

InitialFilters.Prototypes = {
  searchPetsStore: PropTypes.object.isRequired,
  optionsSelectsStore: PropTypes.object.isRequired,
}

export default observer(InitialFilters)
