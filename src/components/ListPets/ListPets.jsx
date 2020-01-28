import React, { Fragment } from 'react'
import URL_LOCAL from '../../config/config'
import LazyLoad from 'react-lazyload'
import noImage from './noImage.svg'
import { Animated } from 'react-animated-css'
import Card from '../commons/Card/Card'
import { MdCancel } from 'react-icons/md'
import styles from './listPets.scss'

const ListPets = ({ filters, pets, isLoading, handleDelete }) => {
  return (
    <Fragment>
      <div className={styles.containerFilters}>
        {filters &&
          filters.map(filter => (
            <div onClick={() => handleDelete(filter.text)} className={styles.filter}>
              {filter.text}
              <span className={styles.icons}>
                <MdCancel size={16} />
              </span>
            </div>
          ))}
      </div>
      <div className={styles.container}>
        {isLoading
          ? pets.map(pet => {
              return (
                <LazyLoad height={200} offset={100}>
                  <Animated
                    animationIn="bounceInUp"
                    animationOut="fadeOut"
                    isVisible={true}
                    animationInDuration={2000}
                  >
                    <Card
                      className={styles.card}
                      key={pet._id}
                      image={pet.image ? `${URL_LOCAL}${pet.image.filename}` : noImage}
                      namePet={pet.name}
                      history={pet.history}
                    />
                  </Animated>
                </LazyLoad>
              )
            })
          : 'loading... '}
      </div>
    </Fragment>
  )
}

export default ListPets
