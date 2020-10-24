import React, { useState, useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useLocalStore, observer } from 'mobx-react'
import { MdKeyboardBackspace, MdLocationOn } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import PetIdStore from 'stores/PetIdStore'
import { AWS_STORAGE, PET_BUCKET } from 'services/config'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import Title from 'components/commons/Title'
import LayoutProfile from 'components/commons/LayoutProfile'
import Button from 'components/commons/Button'
import GaleryImages from 'components/commons/GaleryImages'
import AlertToast from 'components/commons/AlertToast'
import TabViewInformationPet from 'components/commons/TabViewInformationPet'
import Footer from 'components/commons/Footer/index'
import noImage from './noImage.svg'
import styles from './profilePets.scss'

const ProfilePets = () => {
  const [toggleToast, setToggleToast] = useState(false)
  const { id } = useParams()
  const history = useHistory()
  const [isImageNotFound, setIsImageNotFound] = useState(true)

  const handleToggleToast = useCallback(() => {
    setToggleToast(false)
  }, [])

  const petIdStore = useLocalStore(() => new PetIdStore(id))
  const { t } = useTranslation('profilePets')

  const handleGoToProfile = useCallback(() => {
    history.push(
      `/profile-user/${petIdStore.pet.userCreator.value && petIdStore.pet.getUserCreatorId}`
    )
  }, [])

  const {
    getName,
    getHistory,
    textAddress,
    foundLocation,
    getImagePreviews,
    getEmailUserShelter,
    getEmailUserAdopter,
    getPhoneUserShelter,
    getEmailUserCreator,
  } = petIdStore.pet

  const handleWhatsapp = useCallback(() => {
    if (getPhoneUserShelter) {
      window.open(`https://api.whatsapp.com/send?phone=${getPhoneUserShelter}`)
    } else {
      setToggleToast(true)
    }
  }, [getPhoneUserShelter])

  const onError = useCallback(() => {
    setIsImageNotFound(false)
  }, [])

  return (
    <>
      <AlertToast
        text={t('common:callUser')}
        toggleToast={toggleToast}
        handleToggleToast={handleToggleToast}
      />
      <div className={styles.containerMap}>
        <GoogleMapsLocation isProfilePet location={foundLocation.value} />
      </div>
      <LayoutProfile>
        <div className={styles.containerHeader}>
          <div className={styles.userImageContainer}>
            <img
              onError={onError}
              alt="photos-users"
              className={styles.userImage}
              src={
                isImageNotFound && getImagePreviews
                  ? `${AWS_STORAGE}/${PET_BUCKET}/${getImagePreviews[0]}`
                  : noImage
              }
            />
            <div className={styles.containerName}>
              <Title title={`Mi nombre es ${getName}`} />
              <div onClick={handleGoToProfile} className={styles.goToProfile}>
                <div className={styles.iconGoToprofile}>
                  <MdKeyboardBackspace size={15} />
                </div>
                {t('goToProfile', { role: petIdStore.pet.getRole })}
              </div>
            </div>
          </div>
          {textAddress.value && (
            <div className={styles.containerAddress}>
              <span className={styles.icon}>
                <MdLocationOn size={20} />
              </span>
              <div className={styles.textAddress}>{textAddress.value}</div>
            </div>
          )}
        </div>
        <div className={styles.containerButtonWhatsapp}>
          <div className={styles.buttonWhatsapp}>
            <Button bigButton handleClick={handleWhatsapp} text={t('adoptWhatsapp')} />
          </div>
        </div>
        <div className={styles.containerCardInformation}>
          <div className={styles.contact}>
            <TabViewInformationPet
              isPet
              pet={petIdStore.pet}
              history={getHistory}
              phone={getPhoneUserShelter || ''}
              email={getEmailUserShelter || getEmailUserCreator || getEmailUserAdopter}
            />
          </div>
        </div>
        <GaleryImages isLoading={petIdStore.isLoading} store={petIdStore} />
      </LayoutProfile>
      <Footer />
    </>
  )
}

export default observer(ProfilePets)
