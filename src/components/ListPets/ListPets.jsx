import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'
import { Animated } from 'react-animated-css'
import LazyLoad from 'react-lazyload'
import { useHistory } from 'react-router'
import { MdCancel } from 'react-icons/md'
import TextCardInformation from 'components/commons/TextCardInformation'
import CardPets from 'components/commons/CardPets'
import LayoutContainer from 'components/commons/LayoutContainer'
import Loading from 'components/commons/Loading/Loading'
import Chips from 'components/commons/Chips'
import styles from './listPets.scss'

const ListPets = ({ filters, pets, isLoading, handleDelete }) => {
  // const { t } = useTranslation()
  const history = useHistory()
  const goToPet = useCallback(id => {
    history.push(`/`)
    history.push(`profile-pets/${id}`)
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }, [])
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
        {isLoading ? (
          <Loading />
        ) : (
          pets.map(pet => {
            return (
              <LayoutContainer>
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
              </LayoutContainer>
            )
          })
        )}
      </div>
    </>
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
