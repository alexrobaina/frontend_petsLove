import React, { useCallback } from 'react'
import { Animated } from 'react-animated-css'
import LazyLoad from 'react-lazyload'
import { useHistory } from 'react-router'

// import { BrowserRouter as Router, Link } from 'react-router-dom'
import { MdCancel } from 'react-icons/md'
import CardPets from 'components/commons/CardPets'
import styles from './listPets.scss'
import Chips from '../commons/Chips'

const ListPets = ({ filters, pets, isLoading, handleDelete }) => {
  const history = useHistory()
  const goToPet = useCallback(id => history.push(`profile-pets/${id}`), [])
  return (
    <>
      <div className={styles.containerFilters}>
        {filters !== []
          ? filters.map(filter => {
              return (
                <Chips
                  key={filter.text}
                  handleChips={() => handleDelete(filter.text, filter.typeFilter)}
                  text={filter.text}
                  icon={<MdCancel size={16} />}
                />
              )
            })
          : ''}
      </div>
      <div className={styles.container}>
        {isLoading
          ? 'Loading...'
          : pets.map(pet => {
              return (
                <LazyLoad kye={pet._id} height={50} offsetVertical={50}>
                  <Animated
                    animationIn="bounceInUp"
                    animationOut="fadeInUp"
                    isVisible="true"
                    animationInDuration={2000}
                  >
                    <div onClick={() => goToPet(pet._id)}>
                      <CardPets image={pet.image[0]} namePet={pet.name} history={pet.history} />
                    </div>
                  </Animated>
                </LazyLoad>
              )
            })}
      </div>
    </>
  )
}

export default ListPets
