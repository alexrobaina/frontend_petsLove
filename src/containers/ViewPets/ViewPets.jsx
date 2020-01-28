import React, { useState, useEffect } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import SearchPetsStore from '../../stores/SearchPetsStore'
import ListPets from '../../components/ListPets'
import styles from './viewPets.scss'

const ViewPets = () => {
  const searchPetsStore = useLocalStore(() => new SearchPetsStore())

  useEffect(() => {
    searchPetsStore.searchPets()
  }, [])

  return (
    <div className={styles.animationOpacity}>
      <ListPets
        filters={searchPetsStore.filters}
        pets={searchPetsStore.pets}
        isLoading={searchPetsStore.isLoading}
      />
    </div>
  )
}

export default observer(ViewPets)
