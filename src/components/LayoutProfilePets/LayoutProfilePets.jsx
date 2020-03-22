import React from 'react'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import PropTypes from 'prop-types'
import Title from 'components/commons/Title'
import ButtonsPet from 'containers/ProfilePets/ButtonsPet'
import ImageProfilePet from 'components/ImageProfilePet'
import PlaceMarkMap from 'components/commons/PlaceMarkMap'
import InformationPet from 'components/InformationPet'
import TextCard from 'components/commons/TextCard'
import styles from './layoutProfilePets.scss'

const LayoutProfilePets = ({ petIdStore, contactProtectionistEmailStore, isEdit, name }) => {
  const { t } = useTranslation()
  return (
    <>
      <div className={styles.name}>
        <Title mTop="120px" title={t('profilePets.title', { name })} />
        <ButtonsPet
          petIdStore={petIdStore}
          contactProtectionistEmailStore={contactProtectionistEmailStore}
          isEdit={isEdit}
        />
      </div>
      <div className={c(styles.containerCard, styles.layourCard)}>
        <ImageProfilePet petIdStore={petIdStore} />
        <PlaceMarkMap
          defaultPosition={petIdStore.defaultPosition}
          mapPosition={petIdStore.mapPosition}
          contactMessage={c('profilePets.contactMessage')}
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
  isEdit: PropTypes.bool,
}

LayoutProfilePets.defaultProps = {
  isEdit: false,
}

export default LayoutProfilePets
