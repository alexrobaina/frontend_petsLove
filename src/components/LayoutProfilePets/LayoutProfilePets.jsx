import React from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import PropTypes from 'prop-types'
import Title from 'components/commons/Title'
import ButtonsPet from 'containers/ProfilePets/ButtonsPet'
import ImageProfilePet from 'components/ImageProfilePet'
import InformationPet from 'components/InformationPet'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import TextCard from 'components/commons/TextCard'
import styles from './layoutProfilePets.scss'

const LayoutProfilePets = ({ name, petIsEdit, images, pet, userAdopt, phone, email }) => {
  const { t } = useTranslation('profilePets')
  return (
    <>
      <div className={styles.name}>
        <Title title={t('title', { name })} />
        <ButtonsPet email={email} phone={phone} pet={pet} petIsEdit={petIsEdit} />
      </div>
      <div className={c(styles.containerCard, styles.layourCard)}>
        <ImageProfilePet images={images} />
        <GoogleMapsLocation
          petLocation={pet.textAddress}
          isProfilePet
          location={{
            lat: pet.lat,
            lng: pet.lng,
          }}
        />
        <InformationPet userAdopt={userAdopt} pet={pet} />
        <div>
          <TextCard title={t('history')} text={pet.history} />
          {!pet.adopted && (
            <TextCard title={t('requiredToAdoption')} text={pet.requiredToAdoption} />
          )}
        </div>
      </div>
    </>
  )
}

LayoutProfilePets.propTypes = {
  images: PropTypes.oneOfType([PropTypes.array]).isRequired,
  pet: PropTypes.oneOfType([PropTypes.array]).isRequired,
  name: PropTypes.string.isRequired,
  petIsEdit: PropTypes.bool,
}

LayoutProfilePets.defaultProps = {
  petIsEdit: false,
}

export default observer(LayoutProfilePets)
