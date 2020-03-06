import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { MdSearch } from 'react-icons/md'
import InputSelect from 'components/commons/InputSelect'
import InputCheckbox from 'components/commons/InputCheckbox'
import Button from 'components/commons/Button'
import styles from './filterNavbar.scss'

const FilterNavbar = ({ searchPetsStore, optionsSelectsStore, handleToggle }) => {
  const { t } = useTranslation()
  const handleSetLocation = useCallback(selectedValue => {
    optionsSelectsStore.setCountry(selectedValue)
    optionsSelectsStore.setOptionsCities(selectedValue)
    searchPetsStore.setCountry(selectedValue)
  })

  const handleSetCity = useCallback(selectedValue => {
    searchPetsStore.setCity(selectedValue)
  })

  const handleSetCategorie = useCallback(selectedValue => {
    searchPetsStore.setCategory(selectedValue)
  })

  const handleSetActivity = useCallback(selectedValue => {
    searchPetsStore.setActivity(selectedValue)
  })

  const handleSetGender = useCallback(selectedValue => {
    searchPetsStore.setGender(selectedValue)
  })

  const handleSetAge = useCallback(selectedValue => {
    searchPetsStore.setAge(selectedValue)
  })

  const handleSetLost = useCallback(() => {
    searchPetsStore.setLost()
  })

  const handleSetDewormed = useCallback(() => {
    searchPetsStore.setDewormed()
  })

  const handleSetVaccianated = useCallback(() => {
    searchPetsStore.setVaccianated()
  })

  const handleSetUrgent = useCallback(() => {
    searchPetsStore.setUrgent()
  })

  const handleSetSterilized = useCallback(() => {
    searchPetsStore.setSterilized()
  })

  const submitSearch = useCallback(() => {
    handleToggle()
    searchPetsStore.searchPets()
  })

  useEffect(() => {
    optionsSelectsStore.listContries()
    optionsSelectsStore.listGender()
    optionsSelectsStore.listCategories()
    optionsSelectsStore.listAges()
    optionsSelectsStore.listActiviy()
  }, [])

  return (
    <div className={styles.InputContainer}>
      <div className={styles.fromNewSearch}>
        {searchPetsStore.clearSelectCountry && (
          <InputSelect
            handleChange={handleSetLocation}
            options={optionsSelectsStore.countries}
            placeholder={t('filterNavbar.country')}
          />
        )}
      </div>
      <div className={styles.fromNewSearch}>
        {searchPetsStore.clearSelectCity && (
          <InputSelect
            handleChange={handleSetCity}
            options={optionsSelectsStore.cities}
            placeholder={t('filterNavbar.city')}
          />
        )}
      </div>
      <div className={styles.fromNewSearch}>
        {searchPetsStore.clearSelectCategory && (
          <InputSelect
            options={optionsSelectsStore.categories}
            handleChange={handleSetCategorie}
            placeholder={t('filterNavbar.category')}
          />
        )}
      </div>
      <div className={styles.fromNewSearch}>
        {searchPetsStore.clearSelectGender && (
          <InputSelect
            handleChange={handleSetGender}
            options={optionsSelectsStore.gender}
            placeholder={t('filterNavbar.gender')}
          />
        )}
      </div>
      <div className={styles.fromNewSearch}>
        {searchPetsStore.clearSelectAge && (
          <InputSelect
            handleChange={handleSetAge}
            options={optionsSelectsStore.ages}
            placeholder={t('filterNavbar.age')}
          />
        )}
      </div>
      <div className={styles.fromNewSearch}>
        {searchPetsStore.clearSelectActivity && (
          <InputSelect
            handleChange={handleSetActivity}
            options={optionsSelectsStore.activity}
            placeholder={t('filterNavbar.activity')}
          />
        )}
      </div>
      <div className={styles.togoleContainer}>
        <InputCheckbox value={searchPetsStore.lost} handleChange={handleSetLost} text="Lost" />
      </div>
      <div className={styles.togoleContainer}>
        <InputCheckbox
          value={searchPetsStore.urgent}
          handleChange={handleSetUrgent}
          text={t('filterNavbar.urgent')}
        />
      </div>
      <div className={styles.togoleContainer}>
        <InputCheckbox
          value={searchPetsStore.dewormed}
          handleChange={handleSetDewormed}
          text={t('filterNavbar.dewormed')}
        />
      </div>
      <div className={styles.togoleContainer}>
        <InputCheckbox
          value={searchPetsStore.vaccianated}
          handleChange={handleSetVaccianated}
          text={t('filterNavbar.vaccianated')}
        />
      </div>
      <div className={styles.togoleContainer}>
        <InputCheckbox
          value={searchPetsStore.sterilized}
          handleChange={handleSetSterilized}
          text={t('filterNavbar.sterilized')}
        />
      </div>
      <div className={styles.buttonFilter}>
        <Button
          circle
          handleSearch={submitSearch}
          type="button"
          text={t('filterNavbar.search')}
          icon={<MdSearch size={20} />}
        />
      </div>
    </div>
  )
}

FilterNavbar.propTypes = {
  searchPetsStore: PropTypes.node.isRequired,
  optionsSelectsStore: PropTypes.node.isRequired,
  handleToggle: PropTypes.func.isRequired,
}

export default observer(FilterNavbar)
