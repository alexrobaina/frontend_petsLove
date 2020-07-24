import React, { useCallback, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import UserContext from 'Context/UserContext'
import c from 'classnames'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import TextCardContact from 'components/commons/TextCardContact'
import LayoutContainer from 'components/commons/LayoutContainer'
import ButtonShare from 'components/commons/ButtonShare'
import { AWS_STORAGE } from 'services/config'
import Title from 'components/commons/Title'
import PetsUserVet from 'containers/PetsUserVet'
import noImage from '../noImage.svg'
import styles from './vetProfile.scss'

const VetProfile = ({ user }) => {
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore
  const [isImageNotFound, setIsImageNotFound] = useState(true)
  const { id } = useParams()
  const { t } = useTranslation('profileUser')

  const onError = useCallback(() => {
    setIsImageNotFound(false)
  }, [])

  const { name, image, lat, lng, phone, email, _id } = user

  return (
    <LayoutContainer>
      <div className={styles.containerTitle}>
        <Title rolText={t('userVet.role')} title={t('common.titleNameUser', { name })} />
        <ButtonShare
          canView={id === authStore.user._id}
          phone={user.phone || ''}
          route="edit-user"
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
      <TextCardContact title={t('common.contact')} phone={phone} email={email} />
      <PetsUserVet id={_id} />
    </LayoutContainer>
  )
}

VetProfile.propTypes = {
  user: PropTypes.arrayOf([PropTypes.array]).isRequired,
}

export default VetProfile
