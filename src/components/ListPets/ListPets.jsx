import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { observer } from "mobx-react";
import LazyLoad from 'react-lazyload'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import CardPets from 'components/commons/CardPets'
import LayoutTrantitions from 'components/commons/LayoutTrantitions'
import ErrorMessage from 'components/commons/ErrorMessage'
import styles from './listPets.scss'

const ListPets = ({ pets, isUserAdopt }) => {
  const { t } = useTranslation('listPets')
  const history = useHistory()
  const goToPet = useCallback(id => {
    history.push(`/`)
    history.push(`profile-pets/${id}`)
    window.location.reload()
  }, [])

  return (
    <>
      {pets.length > 0 ? (
        <div className={styles.container}>
          {pets.map(pet => {
            return (
              <LayoutTrantitions key={`${pet._id}`}>
                <LazyLoad height={50} offsetVertical={50}>
                  <div onClick={() => goToPet(pet._id)}>
                    <CardPets
                      image={pet.image.filenames[0]}
                      namePet={pet.name}
                      history={pet.history}
                      onClick={() => goToPet(pet._id)}
                      isAdopted={!isUserAdopt && pet.adopted}
                    />
                  </div>
                </LazyLoad>
              </LayoutTrantitions>
            )
          })}
        </div>
      ) : (
        <ErrorMessage text={t('petsNotFound')} typeMessage="warning" />
      )}
    </>
  )
}

ListPets.propTypes = {
  pets: PropTypes.arrayOf(PropTypes.object),
  isUserAdopt: PropTypes.bool,
}

ListPets.defaultProps = {
  pets: [],
  isUserAdopt: false,
}

export default observer(ListPets)
