import React, { useEffect, useCallback } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { useHistory } from 'react-router'
import anime from 'animejs'
import c from 'classnames'
import InitialFormFiltersStore from '../../stores/InitialFormFiltersStore'
import InputSelect from '../commons/InputSelect'
import ListPets from '../ListPets'
import Button from '../commons/Button/Button'
import styles from './initialFormFilters.module.scss'

const InitialFormFilters = () => {
  const initialFormFiltersStore = useLocalStore(() => new InitialFormFiltersStore())

  const handleChange = useCallback(selectedValue => {
    initialFormFiltersStore.setCountry(selectedValue)
    initialFormFiltersStore.setCities(selectedValue)
  })

  const handleChanceCity = useCallback(selectedValue => {
    initialFormFiltersStore.setCity(selectedValue)
  })
  
  const handleDelete = useCallback(filter => {
    initialFormFiltersStore.deleteFilter(filter)
  })

  const handleChanceCategory = useCallback(selectedValue => {
    initialFormFiltersStore.setCategory(selectedValue)
  })

  const handleChanceGender = useCallback(selectedValue => {
    initialFormFiltersStore.setGender(selectedValue)
  })

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
    anime({
      targets: '.animationOpacity',
      opacity: 1,
      easing: 'linear',
      duration: 1000,
      delay: 3500,
    })
  }, [])

  const handleSearch = () => {
    initialFormFiltersStore.searchPets()
  }

  return (
    <div className={c(styles.animationOpacity, 'animationOpacity')}>
      {!initialFormFiltersStore.isFilter ?
       <div className={styles.container}>
       <div className={styles.select1}>
         <InputSelect
           handleChange={handleChange}
           isDirty={initialFormFiltersStore.countryIsDirtry}
           options={initialFormFiltersStore.countries}
           placeholder={'Country'}
           isLoading={initialFormFiltersStore.isLoading}
         />
       </div>
       <div className={styles.select2}>
         <InputSelect
           handleChange={handleChanceCity}
           isDirty={initialFormFiltersStore.cityIsDirtry}
           placeholder={'City'}
           isLoading={initialFormFiltersStore.isLoading}
           options={initialFormFiltersStore.cities}
         />
       </div>
       <div className={styles.select3}>
         <InputSelect
           handleChange={handleChanceCategory}
           options={initialFormFiltersStore.categoriesPets}
           isDirty={initialFormFiltersStore.categoryIsDirtry}
           placeholder={'Type of pet'}
           isLoading={initialFormFiltersStore.isLoading}
         />
       </div>
       <div className={styles.select4}>
         <InputSelect
           handleChange={handleChanceGender}
           options={initialFormFiltersStore.typeGender}
           isDirty={initialFormFiltersStore.genderIsDirtry}
           placeholder={'Gender'}
           isLoading={initialFormFiltersStore.isLoading}
         />
       </div>
       <div className={styles.btnSearch}>
         <Button handleSearch={handleSearch} type="button" styleButton="primary" text="Search" />
       </div>
     </div>
     :
     <div className="animationOpacity">
       <ListPets handleDelete={handleDelete} filters={initialFormFiltersStore.filters} pets={initialFormFiltersStore.pets} isLoading={initialFormFiltersStore.isLoading} />
     </div>
    }

    </div>
  )
}

export default observer(InitialFormFilters)
