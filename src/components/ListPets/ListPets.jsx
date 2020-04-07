import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-animated-css'
import LazyLoad from 'react-lazyload'
import { useHistory } from 'react-router'
import { MdCancel } from 'react-icons/md'
import TextCardInformation from 'components/commons/TextCardInformation'
import CardPets from 'components/commons/CardPets'
import LayoutContainerCard from 'components/commons/LayoutContainerCard'
import Chips from 'components/commons/Chips'
import styles from './listPets.scss'

const ListPets = ({ filters, pets, handleDelete }) => {
  const history = useHistory()
  const goToPet = useCallback(id => {
    history.push(`/`)
    history.push(`profile-pets/${id}`)
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }, [])

  return (
    <LayoutContainerCard>
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
        {pets.map(pet => {
          return (
            <LazyLoad kye={pet._id} height={50} offsetVertical={50}>
              <Animated
                animationIn="bounceInUp"
                animationOut="fadeInUp"
                isVisible="true"
                animationInDuration={2000}
              >
                <div onClick={() => goToPet(pet._id)}>
                  <CardPets
                    onClick={() => goToPet(pet._id)}
                    image={pet.image[0]}
                    namePet={pet.name}
                    history={pet.history}
                  />
                </div>
              </Animated>
            </LazyLoad>
          )
        })}
      </div>
    </LayoutContainerCard>
  )
}

TextCardInformation.propTypes = {
  filters: PropTypes.oneOfType([PropTypes.array]).isRequired,
  pets: PropTypes.oneOfType([PropTypes.array]).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default ListPets
