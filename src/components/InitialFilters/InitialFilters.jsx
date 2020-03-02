import React, { useEffect, useCallback } from 'react'
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
              placeholder="Country"
              handleChange={handleChangeCountrie}
              options={optionsSelectsStore.countries}
              isLoading={optionsSelectsStore.isLoading}
            />
          </div>
          <div className={styles.selectCity}>
            <InputSelect
              placeholder="City"
              options={optionsSelectsStore.cities}
              handleChange={handleChanceCity}
              isLoading={optionsSelectsStore.isLoading}
            />
          </div>
          <div className={styles.selectCategory}>
            <InputSelect
              placeholder="Type of pet"
              options={optionsSelectsStore.categories}
              handleChange={handleChanceCategory}
              isLoading={optionsSelectsStore.isLoading}
            />
          </div>
          <div className={styles.selectGender}>
            <InputSelect
              placeholder="Gender"
              handleChange={handleChanceGender}
              options={optionsSelectsStore.gender}
              isLoading={optionsSelectsStore.isLoading}
            />
          </div>
          <div className={styles.btnSearch}>
            <Button
              icon={<MdSearch size={18} />}
              handleSearch={handleSearch}
              type="button"
              styleButton="primary"
              text="Search"
            />
          </div>
        </div>
      ) : (
        <div className="animationOpacity">
          <ListPets
            handleDelete={deleteFilter}
            filters={searchPetsStore.filters}
            pets={searchPetsStore.pets}
            isLoading={searchPetsStore.isLoading}
          />
        </div>
      )}
      {searchPetsStore.isError && (
        <ErrorMessage text="No pets found, Change filters" typeMessage="warning" />
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
