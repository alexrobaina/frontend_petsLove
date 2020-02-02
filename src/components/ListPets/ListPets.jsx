import React, { Fragment } from 'react'
import { Animated } from 'react-animated-css'
import LazyLoad from 'react-lazyload'
import { MdCancel } from 'react-icons/md'
import noImage from './noImage.svg'
import URL_LOCAL from 'config/config'
import Card from 'components/commons/Card'
import styles from './listPets.scss'

const ListPets = ({ filters, pets, isLoading, handleDelete }) => {
  return (
    <Fragment>
      <div className={styles.containerFilters}>
        {filters !== [] ?
          filters.map(filter => (
            <div onClick={() => handleDelete(filter.text, filter.typeFilter)} className={styles.filter}>
              {filter.text}
              <span className={styles.icons}>
          <MdCancel size={16}/>
          </span>
            </div>
          ))
          : ''
        }
      </div>
      <div className={styles.container}>
        {isLoading
          ? 'Loading...'
          : pets.map(pet => {
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
          })}
      </div>
    </Fragment>
  )
}

export default ListPets
