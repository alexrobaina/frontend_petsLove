import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react'
import UserAdopterStore from 'stores/UserAdopterStore'
import c from 'classnames'
import { AWS_STORAGE } from 'services/config'
import { useParams } from 'react-router'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import TextCard from 'components/commons/TextCard'
import LayoutContainer from 'components/commons/LayoutContainer'
import ListPets from 'components/ListPets'
import Title from 'components/commons/Title'
import ButtonShare from 'components/commons/ButtonShare'
import noImage from '../noImage.svg'
import styles from './adopterProfile.scss'

const AdopterProfile = ({ user }) => {
  const { id } = useParams()
  const [isImageNotFound, setIsImageNotFound] = useState(true)
  const userAdopterStore = useLocalStore(() => new UserAdopterStore())
  const { t } = useTranslation('profileUser')
  const { name, image, lat, lng, aboutUs } = user

  const onError = () => {
    setIsImageNotFound(false)
  }

  return (
    <LayoutContainer rolText={t('adopterUser.role')} title={t('common.titleNameUser', { name })}>
      <ButtonShare canView={id === user._id} phone={user.phone || ''} route="edit-user" />
      <div className={c(styles.containerCard, styles.layourCard)}>
        <img
          onError={onError}
          className={styles.userImage}
          src={image && isImageNotFound ? `${AWS_STORAGE}/${image.filenames[0]}` : noImage}
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
      {userAdopterStore.pets && (
        <>
          {' '}
          <Title title="My pets" /> <ListPets isUserAdopt pets={userAdopterStore.pets} />
        </>
      )}
    </LayoutContainer>
  )
}

AdopterProfile.propTypes = {
  user: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
}

export default observer(AdopterProfile)
