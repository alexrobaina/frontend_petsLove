import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react'
import { useParams } from 'react-router'
import { AWS_STORAGE, LIMIT_LIST, USER_BUCKET } from 'services/config'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import LayoutProfile from 'components/commons/LayoutProfile'
import Button from 'components/commons/Button'
import { MdLocationOn } from 'react-icons/md'
import ShelterStore from 'stores/ShelterStore'
import ListPets from 'containers/ListPets'
import DashboardCard from 'components/commons/DashboardCard'
import Title from 'components/commons/Title'
import SEO from 'components/SEO'
import TabViewInformation from 'components/commons/TabViewInformation/TabViewInformation'
import noImage from '../noImage.svg'
import styles from './shelterProfile.scss'

const ShelterProfile = ({ user }) => {
  const [page, setPage] = useState(1)
  const [limit] = useState(LIMIT_LIST)
  const { id } = useParams()
  const shelterStore = useLocalStore(() => new ShelterStore(id))
  const [isImageNotFound, setIsImageNotFound] = useState(true)
  const { t } = useTranslation()

  const handleForAdoption = useCallback(() => {
    shelterStore.setSwithPets(false)
    shelterStore.getPetsForAdoption(id, LIMIT_LIST, 1, '', false)
  })

  const handleAdopted = useCallback(() => {
    shelterStore.setSwithPets(true)
    shelterStore.getPetsAdopted(id, LIMIT_LIST, 1, '', true)
  })

  const handleChangePage = useCallback((e, newPage) => {
    if (shelterStore.swithPets) {
      shelterStore.getPetsForAdoption(id, LIMIT_LIST, newPage, '', false)
      setPage(newPage)
    } else {
      shelterStore.getPetsAdopted(id, LIMIT_LIST, newPage, '', true)
      setPage(newPage)
    }
  }, [])

  const handleSearch = useCallback(e => {
    if (shelterStore.swithPets) {
      shelterStore.getPetsAdopted(id, LIMIT_LIST, page, e.target.value, true)
    } else {
      shelterStore.getPetsForAdoption(id, LIMIT_LIST, page, e.target.value, false)
    }
  }, [])

  const handleDeletePet = useCallback(idPet => {
    shelterStore.removePet(idPet)
  }, [])

  const onError = useCallback(() => {
    setIsImageNotFound(false)
  }, [])

  const {
    lat,
    lng,
    role,
    email,
    phone,
    image,
    aboutUs,
    username,
    textAddress,
    requirementsToAdopt,
  } = user
  const { petsList, totalPets, swithPets } = shelterStore
  const { totalPetsAdopted, totalPetsForAdoption } = shelterStore.dashboardStore.dashboard

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
              src={
                image && isImageNotFound
                  ? `${AWS_STORAGE}/${USER_BUCKET}/${image.filenames[0]}`
                  : noImage
              }
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
            <DashboardCard titleCard={t('needHome')} total={totalPetsForAdoption.value} />
            <DashboardCard titleCard={t('adopted')} total={totalPetsAdopted.value} />
          </div>
        </div>
        <div className={styles.containerCardInformation}>
          <div className={styles.contact}>
            <TabViewInformation
              phone={phone.value}
              email={email.value}
              aboutUs={aboutUs.value}
              requirementsToAdopt={requirementsToAdopt.value}
            />
          </div>
        </div>
        <div className={styles.containerPets}>
          <div className={styles.buttonsSwich}>
            <Button bigButton handleClick={handleForAdoption} text={t('needHome')} />
          </div>
          <div className={styles.buttonsSwich}>
            <Button bigButton handleClick={handleAdopted} text={t('adopted')} />
          </div>
        </div>
        <ListPets
          page={page}
          limit={limit}
          listPets={petsList}
          totalPets={totalPets}
          handleSearch={handleSearch}
          handleDelete={handleDeletePet}
          handleChangePage={handleChangePage}
          title={swithPets ? t('adopted') : t('needHome')}
        />
      </LayoutProfile>
    </>
  )
}

ShelterProfile.propTypes = {
  user: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object, PropTypes.bool])
    .isRequired,
}

export default observer(ShelterProfile)
