import React, { useContext } from 'react'
// import PropTypes from 'prop-types'
import Navbar from 'components/commons/Navbar'
import UserContext from '../../Context/UserContext'
import LayoutContainer from '../../components/commons/LayoutContainer'
import LayoutProfilePets from '../../components/LayoutProfilePets'
import styles from '../Dashboard/dashboard.scss'
import LayoutContainerCard from '../../components/commons/LayoutContainerCard'
import iconProfesionals from '../Dashboard/businessman.svg'
import Title from '../../components/commons/Title'
import Input from '../../components/commons/Input'
import { useTranslation } from 'react-i18next'
import InputSelect from '../../components/commons/InputSelect'
import MapSearch from '../../components/commons/MapSearch'
import InputCheckbox from '../../components/commons/InputCheckbox'
import Textarea from '../../components/commons/Textarea'
import Button from '../../components/commons/Button'
import Footer from '../../components/commons/Footer/Footer'

const ProfileUser = () => {
  const { t } = useTranslation()
  const rootStore = useContext(UserContext)
  const { optionsSelectsStore, searchPetsStore } = rootStore

  return (
    <>
      <Navbar optionsSelectsStore={optionsSelectsStore} searchPetsStore={searchPetsStore} />
      <LayoutContainer>
        <div className={styles.containerForm}>
          <div className={styles.colLarge}>
            <div className={styles.label}>Add images of pet</div>
            <Input multiple="true" type="file" placeholder={t('images')} />
          </div>
          <div className={styles.col}>
            <InputSelect placeholder={t('city')} />
          </div>
          <div className={styles.col}>
            <InputSelect placeholder={t('categoryPets')} />
          </div>
          <div className={styles.colCheckbox}>
            <InputCheckbox text={t('urgent')} />
          </div>
        </div>
        <Footer />
      </LayoutContainer>
    </>
  )
}

// ProfileUser.propTypes = {}

export default ProfileUser
