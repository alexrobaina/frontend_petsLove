import React, { useCallback, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { MdSearch } from 'react-icons/md'
import InputSelect from 'components/commons/InputSelect'
import InputCheckbox from 'components/commons/InputCheckbox'
import UserContext from 'Context/UserContext'
import Button from 'components/commons/Button'
import styles from './petsFiltersForm.scss'

const PetsFiltersForm = ({ handleToggle }) => {
  const rootStore = useContext(UserContext)
  const { searchPetsStore, optionsSelectsStore } = rootStore
  const { t } = useTranslation('petsFilterForm')

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
            placeholder={t('country')}
          />
        )}
      </div>
      <div className={styles.fromNewSearch}>
        {searchPetsStore.clearSelectCity && (
          <InputSelect
            handleChange={handleSetCity}
            options={optionsSelectsStore.cities}
            placeholder={t('city')}
          />
        )}
      </div>
      <div className={styles.fromNewSearch}>
        {searchPetsStore.clearSelectCategory && (
          <InputSelect
            options={optionsSelectsStore.categories}
            handleChange={handleSetCategorie}
            placeholder={t('category')}
          />
        )}
      </div>
      <div className={styles.fromNewSearch}>
        {searchPetsStore.clearSelectGender && (
          <InputSelect
            handleChange={handleSetGender}
            options={optionsSelectsStore.gender}
            placeholder={t('gender')}
          />
        )}
      </div>
      <div className={styles.fromNewSearch}>
        {searchPetsStore.clearSelectAge && (
          <InputSelect
            handleChange={handleSetAge}
            options={optionsSelectsStore.ages}
            placeholder={t('age')}
          />
        )}
      </div>
      <div className={styles.fromNewSearch}>
        {searchPetsStore.clearSelectActivity && (
          <InputSelect
            handleChange={handleSetActivity}
            options={optionsSelectsStore.activity}
            placeholder={t('activity')}
          />
        )}
      </div>
      <div className={styles.containerCheckbox}>
        <InputCheckbox
          isEdit
          value={searchPetsStore.lost}
          handleChange={handleSetLost}
          text={t('lost')}
        />
      </div>
      <div className={styles.containerCheckbox}>
        <InputCheckbox
          isEdit
          value={searchPetsStore.urgent}
          handleChange={handleSetUrgent}
          text={t('urgent')}
        />
      </div>
      <div className={styles.containerCheckbox}>
        <InputCheckbox
          isEdit
          value={searchPetsStore.dewormed}
          handleChange={handleSetDewormed}
          text={t('dewormed')}
        />
      </div>
      <div className={styles.containerCheckbox}>
        <InputCheckbox
          isEdit
          value={searchPetsStore.vaccianated}
          handleChange={handleSetVaccianated}
          text={t('vaccianated')}
        />
      </div>
      <div className={styles.containerCheckbox}>
        <InputCheckbox
          isEdit
          value={searchPetsStore.sterilized}
          handleChange={handleSetSterilized}
          text={t('sterilized')}
        />
      </div>
      <div className={styles.buttonFilter}>
        <Button
          circle
          handleClick={submitSearch}
          type="button"
          text={t('search')}
          icon={<MdSearch size={20} />}
        />
      </div>
    </div>
  )
}

PetsFiltersForm.propTypes = {
  handleToggle: PropTypes.func.isRequired,
}

export default observer(PetsFiltersForm)
