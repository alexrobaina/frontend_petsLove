import React, { useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router'
import anime from 'animejs'
import c from 'classnames'
import InitialFormFiltersStore from '../../stores/InitialFormFiltersStore'
import InputSelect from '../commons/InputSelect'
import Button from '../commons/Button/Button'
import styles from './initialFormFilters.module.scss'

const InitialFormFilters = () => {
  const history = useHistory()

  const handleChange = useCallback(selectedValue => {
    initialFormFiltersStore.setCountry(selectedValue)
    initialFormFiltersStore.setCities(selectedValue)
  })
  const handleChanceCity = useCallback(selectedValue => {
    initialFormFiltersStore.setCity(selectedValue)
  })
  const handleChanceCategory = useCallback(selectedValue => {
    initialFormFiltersStore.setCategory(selectedValue)
  })
  const handleChanceGender = useCallback(selectedValue => {
    initialFormFiltersStore.setGender(selectedValue)
  })

  const [initialFormFiltersStore] = useState(new InitialFormFiltersStore())

  useEffect(() => {
    initialFormFiltersStore.listContries()
    initialFormFiltersStore.listGender()
    initialFormFiltersStore.listCategoriesPets()

    anime({
      targets: '.animationOpacity',
      opacity: 1,
      easing: 'linear',
      duration: 1000,
      delay: 3500,
    })
  }, [])

  const handleSearch = () => {
    // alert('buscar')

    history.push('/listPets')
  }

  return (
    <div className={c(styles.animationOpacity, 'animationOpacity')}>
      <div className={styles.container}>
        <div className={styles.select1}>
          <InputSelect
            handleChange={handleChange}
            options={initialFormFiltersStore.countries}
            placeholder={'Country'}
            isLoading={initialFormFiltersStore.isLoading}
          />
        </div>
        <div className={styles.select2}>
          <InputSelect
            handleChange={handleChanceCity}
            placeholder={'City'}
            isLoading={initialFormFiltersStore.isLoading}
            options={initialFormFiltersStore.cities}
          />
        </div>
        <div className={styles.select3}>
          <InputSelect
            handleChange={handleChanceCategory}
            options={initialFormFiltersStore.categoriesPets}
            placeholder={'Type of pet'}
            isLoading={initialFormFiltersStore.isLoading}
          />
        </div>
        <div className={styles.select4}>
          <InputSelect
            handleChange={handleChanceGender}
            options={initialFormFiltersStore.typeGender}
            placeholder={'Gender'}
            isLoading={initialFormFiltersStore.isLoading}
          />
        </div>
        <div className={styles.btnSearch}>
          <Button handleSearch={handleSearch} type="button" styleButton="primary" text="Search" />
        </div>
      </div>
    </div>
  )
}

export default observer(InitialFormFilters)
