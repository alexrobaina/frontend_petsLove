import React, { useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react'
import c from 'classnames'
import anime from 'animejs'
import SearchPetsStore from '../../stores/SearchPetsStore'
import ListPets from '../../components/ListPets'
import styles from './viewPets.module.scss'

const ViewPets = () => {
  const [searchPetsStore] = useState(new SearchPetsStore())

  useEffect(() => {
    searchPetsStore.searchPets()

    anime({
      targets: '.animationOpacity',
      opacity: 1,
      easing: 'linear',
      duration: 1000,
      delay: 500,
    })
  }, [])

  return (
    <div className={c(styles.animationOpacity, 'animationOpacity')}>
      <ListPets
        filters={searchPetsStore.filters}
        pets={searchPetsStore.pets}
        isLoading={searchPetsStore.isLoading}
      />
    </div>
  )
}

export default observer(ViewPets)
