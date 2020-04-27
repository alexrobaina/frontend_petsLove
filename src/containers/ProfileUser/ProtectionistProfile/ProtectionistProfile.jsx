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
import noImage from '../noImage.svg'
import styles from './protectionistProfile.scss'
import TextCardContact from '../../../components/commons/TextCardContact'

const ProtectionistProfile = ({ user }) => {
  const [swith, setSwith] = useState(false)
  const { t } = useTranslation('protectionistUsers')
  const { name, image, lat, lng, requirementsToAdopt, _id, phone, email } = user

  const handleAdopted = useCallback(() => {
    setSwith(true)
  })

  const handleForAdoption = useCallback(() => {
    setSwith(false)
  })

  return (
    <LayoutContainer rolText={t('rol')} title={t('title', { name })}>
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
        <TextCardContact title={t('contact')} phone={phone} email={email} />
        <TextCard title={t('requirementsToAdoption')} text={requirementsToAdopt} />
      </div>
      <div className={styles.containerPets}>
        <div className={styles.buttonsSwich}>
          <Button handleClick={handleForAdoption} text="Need home" />
        </div>
        <div className={styles.buttonsSwich}>
          <Button handleClick={handleAdopted} text="Adopted" />
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
  user: PropTypes.arrayOf([PropTypes.array]).isRequired,
}

export default observer(ProtectionistProfile)
