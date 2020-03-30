import React from 'react'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import PropTypes from 'prop-types'
import Title from 'components/commons/Title'
import ButtonsPet from 'containers/ProfilePets/ButtonsPet'
import ImageProfilePet from 'components/ImageProfilePet'
import InformationPet from 'components/InformationPet'
import GoogleMap from 'components/commons/GoogleMapsLocation'
import TextCard from 'components/commons/TextCard'
import styles from './layoutProfilePets.scss'

const LayoutProfilePets = ({ petIdStore, contactProtectionistEmailStore, petIsEdit, name }) => {
  const { t } = useTranslation()
  return (
    <>
      <div className={styles.name}>
        <Title title={t('profilePets.title', { name })} />
        <ButtonsPet
          petIdStore={petIdStore}
          contactProtectionistEmailStore={contactProtectionistEmailStore}
          petIsEdit={petIsEdit}
        />
      </div>
      <div className={c(styles.containerCard, styles.layourCard)}>
        <ImageProfilePet petIdStore={petIdStore} />
        <GoogleMap
          userName={petIdStore.userName}
          phone={petIdStore.phone}
          email={petIdStore.userEmail}
          location={{
            lat: -34.603722,
            lng: -58.381592,
          }}
        />
        <InformationPet petIdStore={petIdStore} />
        <div>
          <TextCard title="History" text={petIdStore.pet.history} />
          <TextCard title="Required to Adoption" text={petIdStore.pet.requiredToAdoption} />
        </div>
      </div>
    </>
  )
}

LayoutProfilePets.propTypes = {
  petIdStore: PropTypes.node.isRequired,
  contactProtectionistEmailStore: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  petIsEdit: PropTypes.bool,
}

LayoutProfilePets.defaultProps = {
  petIsEdit: false,
}

export default LayoutProfilePets
