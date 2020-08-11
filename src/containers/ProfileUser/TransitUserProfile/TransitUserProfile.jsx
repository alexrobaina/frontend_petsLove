import React, { useCallback, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import UserContext from 'Context/UserContext'
import c from 'classnames'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import TextCard from 'components/commons/TextCard'
import TextCardContact from 'components/commons/TextCardContact'
import PetsUserTransit from 'containers/PetsUserTransit'
import LayoutContainer from 'components/commons/LayoutContainer'
import ButtonShare from 'components/commons/ButtonShare'
import { AWS_STORAGE } from 'services/config'
import Title from 'components/commons/Title'
import noImage from '../noImage.svg'
import styles from './transitUserProfile.scss'

const TransitUserProfile = ({ user }) => {
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore
  const [isImageNotFound, setIsImageNotFound] = useState(true)
  const { t } = useTranslation('profileUser')

  const onError = useCallback(() => {
    setIsImageNotFound(false)
  }, [])

  const { name, image, lat, lng, phone, email, _id, aboutUs } = user

  return (
    <LayoutContainer>
      <div className={styles.containerTitle}>
        <Title rolText={t('transitUser.role')} title={t('common.titleNameUser', { name })} />
        <ButtonShare
          route="edit-user"
          phone={user.phone || ''}
          canView={authStore.user ? _id === authStore.user._id : false}
        />
      </div>
      <div className={c(styles.containerCard, styles.layourCard)}>
        <img
          onError={onError}
          alt="photos-users"
          className={styles.userImage}
          src={image && isImageNotFound ? `${AWS_STORAGE}/${image.filenames[0]}` : noImage}
        />
        <GoogleMapsLocation
          isProfilePet
          location={{
            lat,
            lng,
          }}
        />
      </div>
      <div className={styles.containerCard}>
        <TextCardContact title={t('common.contact')} phone={phone} email={email} />
        {aboutUs && <TextCard title={t('common:aboutUs')} text={aboutUs} />}
      </div>
      <PetsUserTransit id={_id} />
    </LayoutContainer>
  )
}

TransitUserProfile.propTypes = {
  user: PropTypes.arrayOf([PropTypes.array]).isRequired,
}

export default TransitUserProfile
