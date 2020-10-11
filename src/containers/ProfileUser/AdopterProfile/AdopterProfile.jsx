import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react'
import AdopterStore from 'stores/AdopterStore'
import { AWS_STORAGE, LIMIT_LIST } from 'services/config'
import { useParams } from 'react-router'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import DashboardCard from 'components/commons/DashboardCard'
import TabViewInformation from 'components/commons/TabViewInformation'
import Title from 'components/commons/Title'
import LayoutProfile from 'components/commons/LayoutProfile'
import ListPets from 'containers/ListPets'
import noImage from '../noImage.svg'
import styles from './adopterProfile.scss'

const AdopterProfile = ({ user }) => {
  const { id } = useParams()
  const [page, setPage] = useState(1)
  const [limit] = useState(LIMIT_LIST)
  const [isImageNotFound, setIsImageNotFound] = useState(true)
  const adopterStore = useLocalStore(() => new AdopterStore(id))
  const { t } = useTranslation()
  const { email, image, lat, lng, aboutUs, _id, phone, role, username } = user

  const handleChangePage = useCallback((e, newPage) => {
    adopterStore.loadPetsAdopter(_id, LIMIT_LIST, newPage)
    setPage(newPage)
  }, [])

  const onError = () => {
    setIsImageNotFound(false)
  }

  const handleDeletePet = useCallback(idPet => {
    adopterStore.removePet(idPet)
  }, [])

  const { petsList, totalPets } = adopterStore

  return (
    <>
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
            {role && (
              <div className={styles.containerAddress}>
                <div className={styles.role}>{t(`${role.value}`)}</div>
              </div>
            )}
          </div>
          <div className={styles.containerDashboardCard}>
            <DashboardCard titleCard={t('myPets')} total={totalPets} />
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
          handleDelete={handleDeletePet}
          handleChangePage={handleChangePage}
          title={totalPets > 1 ? t('myPets') : t('myPet')}
        />
      </LayoutProfile>
    </>
  )
}

export default observer(AdopterProfile)
