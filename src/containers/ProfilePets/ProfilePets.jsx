import React, { useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useLocalStore, observer } from 'mobx-react'
import { MdKeyboardBackspace } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import PetIdStore from 'stores/PetIdStore'
import LayoutContainer from 'components/commons/LayoutContainer'
import GaleryImages from 'components/commons/GaleryImages'
import ErrorMessage from 'components/commons/ErrorMessage'
import LayoutProfilePets from 'components/LayoutProfilePets'
import styles from './profilePets.scss'

const ProfilePets = () => {
  const { id } = useParams()
  const history = useHistory()
  const petIdStore = useLocalStore(() => new PetIdStore(id))
  const { t } = useTranslation('profilePets')

  const handleGoToProfile = useCallback(() => {
    history.push(
      `/profile-user/${petIdStore.pet.userCreator.value && petIdStore.pet.getUserCreatorId}`
    )
  }, [])

  return (
    <LayoutContainer>
      <div onClick={handleGoToProfile} className={styles.goToProfile}>
        <div className={styles.iconGoToprofile}>
          <MdKeyboardBackspace size={15} />
        </div>
        {t('goToProfile', { role: petIdStore.pet.getRole })}
      </div>
      <LayoutProfilePets store={petIdStore} />
      {petIdStore.filenames.value !== [] ? (
        <GaleryImages isLoading={petIdStore.isLoading} store={petIdStore} />
      ) : (
        <ErrorMessage text={t('notImage')} typeMessage="warning" />
      )}
    </LayoutContainer>
  )
}

export default observer(ProfilePets)
