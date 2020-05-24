import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import { useHistory } from 'react-router'
import TextCardInformation from 'components/commons/TextCardInformation'
import CardPets from 'components/commons/CardPets'
import LayoutTrantitions from 'components/commons/LayoutTrantitions'
import styles from './listPets.scss'
import ErrorMessage from '../commons/ErrorMessage'
import { useTranslation } from 'react-i18next'

const ListPets = ({ pets, isUserAdopt }) => {
  const { t } = useTranslation('listPets')
  const history = useHistory()
  const goToPet = useCallback(id => {
    history.push(`/`)
    history.push(`profile-pets/${id}`)
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }, [])

  return (
    <>
      {pets.length > 0 ? (
        <div className={styles.container}>
          {pets.map(pet => {
            return (
              <LayoutTrantitions>
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
              </LayoutTrantitions>
            )
          })}
        </div>
      ) : (
        <ErrorMessage text={t('petsNotFound')} typeMessage={'warning'} />
      )}
    </>
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
