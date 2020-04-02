import React, { useContext } from 'react'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'
import c from 'classnames'
import { MdSave, MdUpdate } from 'react-icons/md'
import UserContext from 'Context/UserContext'
import Navbar from 'components/commons/Navbar'
import LayoutContainer from 'components/commons/LayoutContainer'
import Input from 'components/commons/Input'
import Footer from 'components/commons/Footer/Footer'
import ImageUserLog from 'components/commons/ImageUserLog'
import styles from './profileUser.scss'
import GoogleAutocomplete from '../../components/commons/GoogleAutocomplete/GoogleAutocomplete'
import Button from '../../components/commons/Button'

const ProfileUser = () => {
  // const { t } = useTranslation()
  const rootStore = useContext(UserContext)
  const { optionsSelectsStore, searchPetsStore } = rootStore

  return (
    <>
      <Navbar optionsSelectsStore={optionsSelectsStore} searchPetsStore={searchPetsStore} />
      <LayoutContainer>
        <div className={styles.containerImage}>
          <div className={styles.col}>
            <ImageUserLog isUserLogin={rootStore.authStore.isLogin} size={50} isProfile />
          </div>
          <div className={c(styles.col, styles.buttonFile)}>
            <input type="file" name="file" id="file" className={styles.inputFile} />
            <label className={c(styles.textInput, styles.btnTertiary)}>
              <MdUpdate className={styles.icon} size={15} />
              <span className={styles.jsFileName}>Choose a file</span>
            </label>
          </div>
        </div>
        <div className={styles.containerForm}>
          <div className={styles.colInpur}>
            <Input placeholder="Name" />
          </div>
          <div className={styles.colInpur}>
            <Input placeholder="Email" />
          </div>
          <div className={styles.colInpur}>
            <Input placeholder="Nickname" />
          </div>
          <div className={styles.colInpur}>
            <Input placeholder="Phone" />
          </div>
          <div className={styles.colGoogle}>
            <GoogleAutocomplete />
          </div>
        </div>
        <div className={styles.title}>bank account for donations</div>
        <div className={styles.containerForm}>
          <div className={styles.colInpur}>
            <Input placeholder="CBU or number account" />
          </div>
          <div className={styles.colInpur}>
            <Input placeholder="Alias" />
          </div>
        </div>
        <div className={styles.buttonSave}>
          <Button text="Save Change" icon={<MdSave size={20} />} />
        </div>
        <Footer />
      </LayoutContainer>
    </>
  )
}

// ProfileUser.propTypes = {}

export default ProfileUser
