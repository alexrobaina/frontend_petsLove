import React, { useContext, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react'
import AdopterStore from 'stores/AdopterStore'
import c from 'classnames'
import { AWS_STORAGE, LIMIT_LIST } from 'services/config'
import { useParams } from 'react-router'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import TextCard from 'components/commons/TextCard'
import UserContext from 'Context/UserContext'
import LayoutContainer from 'components/commons/LayoutContainer'
import ListPets from 'containers/ListPets'
import ButtonShare from 'components/commons/ButtonShare'
import noImage from '../noImage.svg'
import styles from './adopterProfile.scss'

const AdopterProfile = ({ user }) => {
  const { id } = useParams()
  const [page, setPage] = useState(1)
  const [limit] = useState(LIMIT_LIST)
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore
  const [isImageNotFound, setIsImageNotFound] = useState(true)
  const adopterStore = useLocalStore(() => new AdopterStore(id))
  const { t } = useTranslation('profileUser')
  const { name, image, lat, lng, aboutUs, _id, phone } = user

  const handleChangePage = useCallback((e, newPage) => {
    adopterStore.loadPetsAdopter(_id, LIMIT_LIST, newPage)
    setPage(newPage)
  }, [])

  const onError = () => {
    setIsImageNotFound(false)
  }

  const { petsList, totalPets } = adopterStore

  return (
    <LayoutContainer
      name={name.value}
      title={t('common.titleNameUser')}
      information={t('adopterUser.role')}
    >
      <ButtonShare
        route="edit-user"
        phone={phone || ''}
        canView={authStore.user ? id === _id : false}
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
            lat: lat.value,
            lng: lng.value,
          }}
        />
      </div>
      {aboutUs && <TextCard title={t('common.aboutUs')} text={aboutUs.value} />}
      <ListPets
        page={page}
        limit={limit}
        listPets={petsList}
        totalPets={totalPets}
        handleChangePage={handleChangePage}
        title={totalPets > 1 ? t('common:myPets') : t('common:myPet')}
      />
    </LayoutContainer>
  )
}

export default observer(AdopterProfile)
