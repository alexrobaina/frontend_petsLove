import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react'
import UserAdopterStore from 'stores/UserAdopterStore'
import c from 'classnames'
import { AWS_STORAGE } from 'services/config'
import { useParams } from 'react-router'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import TextCard from 'components/commons/TextCard'
import UserContext from 'Context/UserContext'
import LayoutContainer from 'components/commons/LayoutContainer'
import ContainerPetsCards from 'components/ContainerPetsCards'
import LayoutContainerCardsPets from 'components/commons/LayoutContainerCardsPets'
import Title from 'components/commons/Title'
import ButtonShare from 'components/commons/ButtonShare'
import noImage from '../noImage.svg'
import styles from './adopterProfile.scss'

const AdopterProfile = ({ user }) => {
  const { id } = useParams()
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore
  const [isImageNotFound, setIsImageNotFound] = useState(true)
  const userAdopterStore = useLocalStore(() => new UserAdopterStore(id))
  const { t } = useTranslation('profileUser')
  const { name, image, lat, lng, aboutUs, _id } = user

  const onError = () => {
    setIsImageNotFound(false)
  }

  return (
    <LayoutContainer
      information={t('adopterUser.role')}
      title={t('common.titleNameUser')}
      name={name}
    >
      <ButtonShare
        route="edit-user"
        phone={user.phone || ''}
        canView={authStore.user ? _id === authStore.user._id : false}
      />
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
      {aboutUs && <TextCard title={t('common.aboutUs')} text={aboutUs} />}
      {userAdopterStore.pets && (
        <>
          <LayoutContainerCardsPets>
            <Title
              title={
                userAdopterStore.pets.length > 1 ? t('adopterUser.myPets') : t('adopterUser.myPet')
              }
            />
          </LayoutContainerCardsPets>
          <ContainerPetsCards isUserAdopt pets={userAdopterStore.pets} />
        </>
      )}
    </LayoutContainer>
  )
}

AdopterProfile.propTypes = {
  user: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
}

export default observer(AdopterProfile)
