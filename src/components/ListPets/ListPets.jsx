import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import { useHistory } from 'react-router'
import TextCardInformation from 'components/commons/TextCardInformation'
import CardPets from 'components/commons/CardPets'
import LayoutTrantitions from 'components/commons/LayoutTrantitions'
import styles from './listPets.scss'

const ListPets = ({ pets, isUserAdopt }) => {
  const history = useHistory()
  const goToPet = useCallback(id => {
    history.push(`/`)
    history.push(`profile-pets/${id}`)
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }, [])

  return (
    <LayoutTrantitions>
      {pets.length > 0 && (
        <div className={styles.container}>
          {pets.map(pet => {
            return (
              <LazyLoad kye={pet._id} height={50} offsetVertical={50}>
                <div onClick={() => goToPet(pet._id)}>
                  <CardPets
                    isAdopted={!isUserAdopt && pet.adopted}
                    onClick={() => goToPet(pet._id)}
                    image={pet.image[0]}
                    namePet={pet.name}
                    history={pet.history}
                  />
                </div>
              </LazyLoad>
            )
          })}
        </div>
      )}
    </LayoutTrantitions>
  )
}

TextCardInformation.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isUserAdopt: PropTypes.bool,
  isError: PropTypes.bool.isRequired,
}

TextCardInformation.defaultProps = {
  isUserAdopt: false,
}

export default ListPets
