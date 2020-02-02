import React, { useEffect, useCallback } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import anime from 'animejs'
import c from 'classnames'
import OptionsSelectsStore from 'stores/OptionsSelectsStore'
import InputSelect from 'components/commons/InputSelect'
import ListPets from 'components/ListPets'
import Button from 'components/commons/Button'
import styles from './initialFilters.scss'

const InitialFilters = ({ searchPetsStore }) => {
  const optionsSelectsStore = useLocalStore(() => new OptionsSelectsStore())

  const handleChange = useCallback(selectedValue => {
    optionsSelectsStore.setCountry(selectedValue)
    searchPetsStore.setCountry(selectedValue)
    optionsSelectsStore.setOptionsCities(selectedValue)
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
              placeholder={'Country'}
              handleChange={handleChange}
              options={optionsSelectsStore.countries}
              isLoading={optionsSelectsStore.isLoading}
            />
          </div>
          <div className={styles.selectCity}>
            <InputSelect
              placeholder={'City'}
              options={optionsSelectsStore.cities}
              handleChange={handleChanceCity}
              isLoading={optionsSelectsStore.isLoading}
            />
          </div>
          <div className={styles.selectCategory}>
            <InputSelect
              placeholder={'Type of pet'}
              options={optionsSelectsStore.categories}
              handleChange={handleChanceCategory}
              isLoading={optionsSelectsStore.isLoading}
            />
          </div>
          <div className={styles.selectGender}>
            <InputSelect
              placeholder={'Gender'}
              handleChange={handleChanceGender}
              options={optionsSelectsStore.gender}
              isLoading={optionsSelectsStore.isLoading}
            />
          </div>
          <div className={styles.btnSearch}>
            <Button handleSearch={handleSearch} type="button" styleButton="primary" text="Search"/>
          </div>
        </div>
      ) : (
        <div className="animationOpacity">
          <ListPets handleDelete={deleteFilter}
            filters={searchPetsStore.filters}
            pets={searchPetsStore.pets}
            isLoading={searchPetsStore.isLoading}
          />
        </div>
      )}
      <div className={styles.finish}></div>
    </div>
  )
}

export default observer(InitialFilters)
