import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import LayoutProfile from 'components/commons/LayoutProfile'
import DashboardCard from 'components/commons/DashboardCard'
import TabViewInformation from 'components/commons/TabViewInformation'
import { MdLocationOn } from 'react-icons/md'
import SEO from 'components/SEO'
import VeterinaryStore from 'stores/VeterinaryStore'
import ListPets from 'containers/ListPets'
import { AWS_STORAGE, LIMIT_LIST } from 'services/config'
import Title from 'components/commons/Title'
import noImage from '../noImage.svg'
import styles from './veterinaryProfile.scss'

const VeterinaryProfile = ({ user }) => {
  const [page, setPage] = useState(1)
  const [limit] = useState(LIMIT_LIST)
  const [isImageNotFound, setIsImageNotFound] = useState(true)
  const { t } = useTranslation()
  const veterinaryStore = useLocalStore(() => new VeterinaryStore(user._id))

  const handleChangePage = useCallback((e, newPage) => {
    veterinaryStore.loadPetsVeterinaryCared(user._id, LIMIT_LIST, newPage, '')
    setPage(newPage)
  }, [])

  const handleSearch = useCallback(e => {
    veterinaryStore.loadPetsVeterinaryCared(user._id, LIMIT_LIST, page, e.target.value)
  }, [])

  const onError = useCallback(() => {
    setIsImageNotFound(false)
  }, [])

  const handleDeletePet = useCallback(idPet => {
    veterinaryStore.removePet(idPet)
  }, [])

  const { username, image, lat, lng, phone, email, aboutUs, textAddress, role } = user
  const { petsList, totalPets } = veterinaryStore

  return (
    <>
      <SEO pageTitle={t('userProfile')} />
      <div className={styles.containerMap}>
        <GoogleMapsLocation
          isProfilePet
          location={{
            lat: lat.value,
            lng: lng.value,
          }}
        />
      </div>
      <LayoutProfile>
        <div className={styles.containerHeader}>
          <div className={styles.userImageContainer}>
            <img
              onError={onError}
              alt="photos-users"
              className={styles.userImage}
              src={image && isImageNotFound ? `${AWS_STORAGE}/${image.filenames[0]}` : noImage}
            />
            <Title title={username.value.split('-').join(' ')} />
            {textAddress.value && (
              <div className={styles.containerAddress}>
                <span className={styles.icon}>
                  <MdLocationOn size={20} />
                </span>
                <div className={styles.textAddress}>{textAddress.value}</div>
              </div>
            )}
            {role && (
              <div className={styles.containerAddress}>
                <div className={styles.role}>{t(`${role.value}`)}</div>
              </div>
            )}
          </div>
          <div className={styles.containerDashboardCard}>
            <DashboardCard titleCard={t('petsCared')} total={totalPets} />
          </div>
        </div>
        <div className={styles.containerCardInformation}>
          <div className={styles.contact}>
            <TabViewInformation phone={phone.value} email={email.value} aboutUs={aboutUs.value} />
          </div>
        </div>
        <ListPets
          page={page}
          limit={limit}
          listPets={petsList}
          totalPets={totalPets}
          handleSearch={handleSearch}
          handleDelete={handleDeletePet}
          title={t('petsCared')}
          handleChangePage={handleChangePage}
        />
      </LayoutProfile>
    </>
  )
}

export default observer(VeterinaryProfile)
