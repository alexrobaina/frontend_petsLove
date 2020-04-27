import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react'
import SearchPetsStore from 'stores/SearchPetsStore'
import c from 'classnames'
import { SERVER } from 'services/config'
import { useParams } from 'react-router'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import TextCard from 'components/commons/TextCard'
import LayoutContainer from 'components/commons/LayoutContainer'
import ListPets from 'components/ListPets'
import Title from 'components/commons/Title'
import noImage from '../noImage.svg'
import styles from './adopterProfile.scss'

const AdopterProfile = ({ user }) => {
  const searchPetsStore = useLocalStore(() => new SearchPetsStore())
  const { t } = useTranslation('viewUsers')
  const param = useParams()
  const { name, image, lat, lng, aboutUs } = user

  useEffect(() => {
    searchPetsStore.getPetForUser(param.id)
  }, [])
  console.log(user)
  return (
    <LayoutContainer rolText={t('rol')} title={t('title', { name })}>
      <div className={c(styles.containerCard, styles.layourCard)}>
        <img
          className={styles.userImage}
          src={image ? `${SERVER}/${image}` : noImage}
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
      {aboutUs && <TextCard title={t('contact')} text={aboutUs} />}
      {searchPetsStore.petsUserAdopt && (
        <>
          {' '}
          <Title title="My pets" /> <ListPets isUserAdopt pets={searchPetsStore.petsUserAdopt} />
        </>
      )}
    </LayoutContainer>
  )
}

AdopterProfile.propTypes = {
  user: PropTypes.arrayOf([PropTypes.array]).isRequired,
}

export default observer(AdopterProfile)
