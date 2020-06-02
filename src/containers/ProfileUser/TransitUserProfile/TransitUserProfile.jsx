import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import { SERVER } from 'services/config'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import TextCardContact from 'components/commons/TextCardContact'
import PetsUserTransit from 'containers/PetsUserTransit'
import LayoutContainer from 'components/commons/LayoutContainer'
import Title from 'components/commons/Title'
import noImage from '../noImage.svg'
import ButtonsPet from '../../ProfilePets/ButtonsPet'
import styles from './transitUserProfile.scss'

const TransitUserProfile = ({ user }) => {
  const [isImageNotFound, setIsImageNotFound] = useState(true)
  const { t } = useTranslation('profileUser')

  const onError = useCallback(() => {
    setIsImageNotFound(false)
  }, [])
  
  const { name, image, lat, lng, phone, email, _id } = user
  
  return (
    <LayoutContainer>
      <div className={styles.containerTitle}>
        <Title rolText={t('transitUser.role')} title={t('transitUser.titleNameUser', { name })} />
        <ButtonsPet email={email} phone={phone} />
      </div>
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
      <TextCardContact title={t('common.contact')} phone={phone} email={email} />
      <PetsUserTransit id={_id} />
    </LayoutContainer>
  )
}

TransitUserProfile.propTypes = {
  user: PropTypes.arrayOf([PropTypes.array]).isRequired,
}

export default TransitUserProfile
