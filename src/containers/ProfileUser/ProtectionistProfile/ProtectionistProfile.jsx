import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import { SERVER } from 'services/config'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import { observer } from 'mobx-react'
import TextCard from 'components/commons/TextCard'
import LayoutContainer from 'components/commons/LayoutContainer'
import Button from 'components/commons/Button'
import ForAdoption from 'containers/ForAdoption'
import PetsAdopted from 'containers/PetsAdopted'
import TextCardContact from 'components/commons/TextCardContact'
import Title from 'components/commons/Title'
import ButtonsPet from '../../ProfilePets/ButtonsPet'
import noImage from '../noImage.svg'
import styles from './protectionistProfile.scss'

const ProtectionistProfile = ({ user }) => {
  const [isImageNotFound, setIsImageNotFound] = useState(true)
  const [swith, setSwith] = useState(false)
  const { t } = useTranslation('profileUser')
  const { name, image, lat, lng, requirementsToAdopt, _id, phone, email } = user

  const handleAdopted = useCallback(() => {
    setSwith(true)
  })

  const handleForAdoption = useCallback(() => {
    setSwith(false)
  })

  const onError = useCallback(() => {
    setIsImageNotFound(false)
  }, [])

  return (
    <LayoutContainer>
      <div className={styles.containerTitle}>
        <Title
          rolText={t('protectionistUser.role')}
          title={t('protectionistUser.titleNameUser', { name })}
        />
        <ButtonsPet email={email} phone={phone} image={image} />
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
        <TextCardContact title={t('common.contact')} phone={phone} email={email} />
        <TextCard title={t('protectionistUser.requirementsToAdopt')} text={requirementsToAdopt} />
      </div>
      <div className={styles.containerPets}>
        <div className={styles.buttonsSwich}>
          <Button handleClick={handleForAdoption} text={t('protectionistUser.needHome')} />
        </div>
        <div className={styles.buttonsSwich}>
          <Button handleClick={handleAdopted} text={t('protectionistUser.adopted')} />
        </div>
      </div>
      <div>
        {swith ? (
          <>
            <PetsAdopted id={_id} />
          </>
        ) : (
          <>
            <ForAdoption id={_id} />
          </>
        )}
      </div>
    </LayoutContainer>
  )
}

ProtectionistProfile.propTypes = {
  user: PropTypes.arrayOf([PropTypes.string, PropTypes.bool, PropTypes.number]).isRequired,
}

export default observer(ProtectionistProfile)
