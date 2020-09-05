import React, { useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import UserContext from 'Context/UserContext'
import { observer, useLocalStore } from 'mobx-react'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import TextCardContact from 'components/commons/TextCardContact'
import TextCard from 'components/commons/TextCard'
import LayoutContainer from 'components/commons/LayoutContainer'
import VeterinaryStore from 'stores/VeterinaryStore'
import ButtonShare from 'components/commons/ButtonShare'
import ListPets from 'containers/ListPets'
import { AWS_STORAGE, LIMIT_LIST } from 'services/config'
import Title from 'components/commons/Title'
import noImage from '../noImage.svg'
import styles from './veterinaryProfile.scss'

const VeterinaryProfile = () => {
  const [page, setPage] = useState(1)
  const [limit] = useState(LIMIT_LIST)
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore
  const [isImageNotFound, setIsImageNotFound] = useState(true)
  const { t } = useTranslation('profileUser')
  const { _id } = authStore.user
  const veterinaryStore = useLocalStore(() => new VeterinaryStore(_id))

  const handleChangePage = useCallback((e, newPage) => {
    veterinaryStore.loadPetsVeterinaryCared(_id, LIMIT_LIST, newPage, '')
    setPage(newPage)
  }, [])

  const handleSearch = useCallback(e => {
    veterinaryStore.loadPetsVeterinaryCared(_id, LIMIT_LIST, page, e.target.value)
  }, [])

  const onError = useCallback(() => {
    setIsImageNotFound(false)
  }, [])

  const { username, image, lat, lng, phone, email, aboutUs, requirementsToAdopt } = authStore.user
  const { petsList, totalPets } = veterinaryStore

  return (
    <LayoutContainer>
      <div className={styles.containerTitle}>
        <Title
          rolText={t('veterinary.role')}
          title={t('common.titleNameUser', { name: username.split('-').join(' ') })}
        />
        <ButtonShare
          route="edit-user"
          phone={phone || ''}
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
        <div className={styles.contact}>
          <TextCardContact title={t('common.contact')} phone={phone} email={email} />
        </div>
        <div className={styles.requirementsToAdopt}>
          <TextCard title={t('common:requirementsToAdopt')} text={requirementsToAdopt} />
        </div>
        <div className={styles.aboutUs}>
          <TextCard title={t('common:aboutUs')} text={aboutUs} />
        </div>
      </div>
      <ListPets
        page={page}
        limit={limit}
        listPets={petsList}
        totalPets={totalPets}
        handleSearch={handleSearch}
        title={t('veterinary.petsCared')}
        handleChangePage={handleChangePage}
      />
    </LayoutContainer>
  )
}

export default observer(VeterinaryProfile)
