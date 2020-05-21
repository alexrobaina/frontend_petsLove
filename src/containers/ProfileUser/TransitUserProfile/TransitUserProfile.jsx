import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import { SERVER } from 'services/config'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import TextCardContact from 'components/commons/TextCardContact'
import PetsUserTransit from 'containers/PetsUserTransit'
import LayoutContainer from 'components/commons/LayoutContainer'
import noImage from '../noImage.svg'
import Title from 'components/commons/Title'
import styles from './transitUserProfile.scss'
import ButtonsPet from '../../ProfilePets/ButtonsPet'

const TransitUserProfile = ({ user }) => {
  const { t } = useTranslation('transitUser')
  const { name, image, lat, lng, phone, email, _id } = user

  return (
    <LayoutContainer>
      <div className={styles.containerTitle}>
        <Title rolText={t('rol')} title={t('title', { name })} />
        <ButtonsPet email={email} phone={phone} />
      </div>
      <div className={c(styles.containerCard, styles.layourCard)}>
        <img
          className={styles.userImage}
          src={image ? `${SERVER}/${image}` : noImage}
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
      <TextCardContact title={t('contact')} phone={phone} email={email} />
      <PetsUserTransit id={_id} />
    </LayoutContainer>
  )
}

TransitUserProfile.propTypes = {
  user: PropTypes.arrayOf([PropTypes.array]).isRequired,
}

export default TransitUserProfile
