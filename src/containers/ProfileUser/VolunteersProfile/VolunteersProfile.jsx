import React, { useCallback, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { observer, useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import UserContext from 'Context/UserContext'
import { MdLocationOn } from 'react-icons/md'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import DashboardCard from 'components/commons/DashboardCard'
import TabViewInformation from 'components/commons/TabViewInformation'
import VolunteersStore from 'stores/VolunteersStore'
import LayoutProfile from 'components/commons/LayoutProfile'
import { AWS_STORAGE, LIMIT_LIST } from 'services/config'
import SEO from 'components/SEO'
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
  const { t } = useTranslation()
  const volunteersStore = useLocalStore(() => new VolunteersStore(authStore.user._id))

  const onError = useCallback(() => {
    setIsImageNotFound(false)
  }, [])

  const { username, image, lat, lng, phone, email, aboutUs, role, textAddress } = user
  const { petsList, totalPets } = volunteersStore
  const {
    totalVolunteersPetsOwner,
    totalVolunteersPetsCare,
  } = volunteersStore.dashboardStore.dashboard

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
            <DashboardCard
              titleCard={t('transitPetsTitle')}
              total={totalVolunteersPetsCare.value}
            />
            <DashboardCard titleCard={t('myPets')} total={totalVolunteersPetsOwner.value} />
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
          title={t('transitPetsTitle')}
        />
      </LayoutProfile>
    </>
  )
}

VolunteersProfile.propTypes = {
  user: PropTypes.arrayOf([PropTypes.array]).isRequired,
}

export default observer(VolunteersProfile)
