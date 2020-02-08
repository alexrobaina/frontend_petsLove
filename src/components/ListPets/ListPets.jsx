import React from 'react'
import { Animated } from 'react-animated-css'
import LazyLoad from 'react-lazyload'
import { MdCancel } from 'react-icons/md'
import noImage from './noImage.svg'
import URL_LOCAL from 'config/config'
import Card from 'components/commons/Card'
import styles from './listPets.scss'
import Chips from '../commons/Chips'

const ListPets = ({ filters, pets, isLoading, handleDelete }) => {
  return (
    <>
      <div className={styles.containerFilters}>
        {filters !== []
          ? filters.map(filter => (
              <Chips
                key={filter.text}
                handleChips={() => handleDelete(filter.text, filter.typeFilter)}
                text={filter.text}
                icon={<MdCancel size={16} />}
              />
            ))
          : ''}
      </div>
      <div className={styles.container}>
        {isLoading
          ? 'Loading...'
          : pets.map(pet => {
              return (
                <LazyLoad height={200} offset={100}>
                  <Animated
                    animationIn="bounceInUp"
                    animationOut="fadeInUp"
                    isVisible="true"
                    animationInDuration={2000}
                  >
                    <Card
                      key={pet._id}
                      image={pet.image[0] ? `${URL_LOCAL}${pet.image[0]}` : noImage}
                      namePet={pet.name}
                      history={pet.history}
                    />
                  </Animated>
                </LazyLoad>
              )
            })}
      </div>
    </>
  )
}

export default ListPets
