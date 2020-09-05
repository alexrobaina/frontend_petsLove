import React, { useCallback, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import { observer, useLocalStore } from 'mobx-react'
import { useParams } from 'react-router'
import TextCard from 'components/commons/TextCard'
import { AWS_STORAGE, LIMIT_LIST } from 'services/config'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import LayoutContainer from 'components/commons/LayoutContainer'
import Button from 'components/commons/Button'
import ShelterStore from 'stores/ShelterStore'
import ListPets from 'containers/ListPets'
import TextCardContact from 'components/commons/TextCardContact'
import Title from 'components/commons/Title'
import ButtonShare from 'components/commons/ButtonShare'
import UserContext from 'Context/UserContext'
import noImage from '../noImage.svg'
import styles from './shelterProfile.scss'

const ShelterProfile = ({ user }) => {
  const [page, setPage] = useState(1)
  const [limit] = useState(LIMIT_LIST)
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore
  const { id } = useParams()
  const shelterStore = useLocalStore(() => new ShelterStore(id))
  const [isImageNotFound, setIsImageNotFound] = useState(true)
  const { t } = useTranslation('profileUser')

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

  const onError = useCallback(() => {
    setIsImageNotFound(false)
  }, [])

  const { image, lat, lng, requirementsToAdopt, _id, phone, email, aboutUs, username } = user
  const { petsList, totalPets, swithPets } = shelterStore

  return (
    <LayoutContainer>
      <div className={styles.containerTitle}>
        <Title
          rolText={t('shelter.role')}
          title={t('common.titleNameUser', {
            name: username.split('-').join(' '),
          })}
        />
        <ButtonShare
          route="edit-user"
          phone={user.phone || ''}
          canView={authStore.user ? _id === authStore.user._id : false}
        />
      </div>
      <div className={c(styles.containerCard, styles.layourCard)}>
        <img
          onError={onError}
          className={styles.userImage}
          src={image && isImageNotFound ? `${AWS_STORAGE}/${image.filenames[0]}` : noImage}
          alt="photos-users"
        />
        <GoogleMapsLocation
          isProfilePet
          location={{
            lat,
            lng,
          }}
        />
      </div>
      <div className={styles.containerCardInformation}>
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
      <div className={styles.containerPets}>
        <div className={styles.buttonsSwich}>
          <Button handleClick={handleForAdoption} text={t('shelter.needHome')} />
        </div>
        <div className={styles.buttonsSwich}>
          <Button handleClick={handleAdopted} text={t('shelter.adopted')} />
        </div>
      </div>
      <ListPets
        page={page}
        limit={limit}
        listPets={petsList}
        totalPets={totalPets}
        handleSearch={handleSearch}
        handleChangePage={handleChangePage}
        title={swithPets ? t('shelter.adopted') : t('shelter.needHome')}
      />
    </LayoutContainer>
  )
}

ShelterProfile.propTypes = {
  user: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object, PropTypes.bool])
    .isRequired,
}

export default observer(ShelterProfile)
