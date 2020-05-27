import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react'
import SearchPetsStore from 'stores/SearchPetsStore'
import c from 'classnames'
import { SERVER } from 'services/config'
import { useParams } from 'react-router'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import TextCard from 'components/commons/TextCard'
import LayoutContainer from 'components/commons/LayoutContainer'
import ListPets from 'components/ListPets'
import Title from 'components/commons/Title'
import noImage from '../noImage.svg'
import styles from './adopterProfile.scss'

const AdopterProfile = ({ user }) => {
  const [isImageNotFound, setIsImageNotFound] = useState(true)
  const searchPetsStore = useLocalStore(() => new SearchPetsStore())
  const { t } = useTranslation('profileUser')
  const param = useParams()
  const { name, image, lat, lng, aboutUs } = user

  const onError = () => {
    setIsImageNotFound(false)
  }

  useEffect(() => {
    searchPetsStore.getPetForUser(param.id)
  }, [])

  return (
    <LayoutContainer rolText={t('adopterUser.role')} title={t('common.titleNameUser', { name })}>
      <div className={c(styles.containerCard, styles.layourCard)}>
        <img
          onError={onError}
          className={styles.userImage}
          src={image && isImageNotFound ? `${SERVER}/${image}` : noImage}
          alt="photos-users"
        />
        <GoogleMapsLocation
          isProfilePet
          location={{
            lat,
            lng,
          }}
        />
      </div>
      {aboutUs && <TextCard title={t('common.aboutUs')} text={aboutUs} />}
      {searchPetsStore.petsUserAdopt && (
        <>
          {' '}
          <Title title="My pets" /> <ListPets isUserAdopt pets={searchPetsStore.petsUserAdopt} />
        </>
      )}
    </LayoutContainer>
  )
}

AdopterProfile.propTypes = {
  user: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
}

export default observer(AdopterProfile)
