import React, { useCallback, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { observer, useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import UserContext from 'Context/UserContext'
import c from 'classnames'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import TextCard from 'components/commons/TextCard'
import TextCardContact from 'components/commons/TextCardContact'
import LayoutContainer from 'components/commons/LayoutContainer'
import ButtonShare from 'components/commons/ButtonShare'
import VolunteersStore from 'stores/VolunteersStore'
import { AWS_STORAGE, LIMIT_LIST } from 'services/config'
import Title from 'components/commons/Title'
import ListPets from 'containers/ListPets'
import noImage from '../noImage.svg'
import styles from './volunteersProfile.scss'

const VolunteersProfile = ({ user }) => {
  const [page] = useState(1)
  const [limit] = useState(LIMIT_LIST)
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore
  const [isImageNotFound, setIsImageNotFound] = useState(true)
  const { t } = useTranslation('profileUser')
  const volunteersStore = useLocalStore(() => new VolunteersStore(authStore.user._id))

  const onError = useCallback(() => {
    setIsImageNotFound(false)
  }, [])

  const { name, image, lat, lng, phone, email, _id, aboutUs } = user
  const { petsList, totalPets } = volunteersStore

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
      <ListPets
        page={page}
        limit={limit}
        listPets={petsList}
        totalPets={totalPets}
        title={t('common:needHome')}
      />
    </LayoutContainer>
  )
}

VolunteersProfile.propTypes = {
  user: PropTypes.arrayOf([PropTypes.array]).isRequired,
}

export default observer(VolunteersProfile)
