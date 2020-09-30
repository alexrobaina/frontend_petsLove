import React, { useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import LazyLoad from 'react-lazyload'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import UserContext from 'Context/UserContext'
import CardPets from 'components/commons/CardPets'
import LayoutTrantitions from 'components/commons/LayoutTrantitions'
import Loading from 'components/commons/Loading'
import ErrorMessage from 'components/commons/ErrorMessage'
import styles from './containerPetsCards.scss'

const ContainerPetsCards = ({ pets, isUserAdopt, isLoading, handleDelete }) => {
  const { t } = useTranslation('containerPetsCards')
  const history = useHistory()
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  const goToPet = useCallback(id => {
    history.push(`/`)
    history.push(`profile-pets/${id}`)
  }, [])

  const handleEdit = useCallback(id => {
    history.push(`/`)
    history.push(`edit-pet/${id}`)
  }, [])

  if (isLoading) {
    return <Loading loadingRing />
  }

  return (
    <>
      {pets.length > 0 ? (
        <div className={styles.container}>
          {pets.map(pet => {
            if (pet) {
              return (
                <LayoutTrantitions key={`${pet._id}`}>
                  <LazyLoad height={50} offsetVertical={50}>
                    <div>
                      <CardPets
                        id={pet._id}
                        goToPet={goToPet}
                        namePet={pet.name}
                        history={pet.history}
                        gender={pet.gender}
                        category={pet.category}
                        handleEdit={handleEdit}
                        textAdress={pet.textAdress}
                        handleDelete={handleDelete}
                        userLogin={authStore?.user}
                        activityLevel={pet.activityLevel}
                        isAdopted={!isUserAdopt && pet.adopted}
                        image={pet.image ? pet.image.filenames[0] : ''}
                        canEdit={
                          pet.userCreator === authStore?.user?._id ||
                          pet.userAdopter === authStore?.user?._id
                        }
                        canDelete={
                          pet.userShelter === authStore?.user?._id ||
                          pet.userCreator === authStore?.user?._id
                        }
                      />
                    </div>
                  </LazyLoad>
                </LayoutTrantitions>
              )
            }
            return ''
          })}
        </div>
      ) : (
        <ErrorMessage text={t('petsNotFound')} typeMessage="warning" />
      )}
    </>
  )
}

ContainerPetsCards.propTypes = {
  isLoading: PropTypes.bool,
  isUserAdopt: PropTypes.bool,
  handleDelete: PropTypes.func,
  pets: PropTypes.arrayOf(PropTypes.object),
}

ContainerPetsCards.defaultProps = {
  pets: [],
  isLoading: false,
  handleDelete: null,
  isUserAdopt: false,
}

export default observer(ContainerPetsCards)
