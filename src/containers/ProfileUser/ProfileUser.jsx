import React, { useContext } from 'react'
// import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import UserContext from 'Context/UserContext'
import Navbar from 'components/commons/Navbar'
import LayoutContainer from 'components/commons/LayoutContainer'
import Input from 'components/commons/Input'
import InputSelect from 'components/commons/InputSelect'
import InputCheckbox from 'components/commons/InputCheckbox'
import Footer from 'components/commons/Footer/Footer'
import styles from './profileUser.scss'

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
