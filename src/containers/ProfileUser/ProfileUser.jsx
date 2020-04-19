import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import { MdUpdate } from 'react-icons/md'
import { useParams } from 'react-router'
import { observer, useLocalStore } from 'mobx-react'
import UserContext from 'Context/UserContext'
import LayoutContainer from 'components/commons/LayoutContainer'
import Input from 'components/commons/Input'
import Footer from 'components/commons/Footer/Footer'
import ImageUserLog from 'components/commons/ImageUserLog'
import EditUserStore from 'stores/EditUserStore'
import GoogleAutocomplete from 'components/commons/GoogleAutocomplete/GoogleAutocomplete'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import ButtonsEditFixed from 'components/commons/ButtonsEditFixed'
import Textarea from 'components/commons/Textarea'
import InputCheckbox from 'components/commons/InputCheckbox'
import styles from './profileUser.scss'

const ProfileUser = () => {
  const { id } = useParams()
  const { t } = useTranslation('profileUser')
  const fileUpload = useRef()
  const editUserStore = useLocalStore(() => new EditUserStore())

  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  const onClickFileUpload = useCallback(() => {
    fileUpload.current.click()
  }, [])

  const handleChangeImage = useCallback(e => {
    editUserStore.setImage(e.target.files[0])
  })

  const handleChangeTextAddress = useCallback(location => {
    editUserStore.setTextAddress(location)
  }, [])

  const handleChangeAddress = useCallback(address => {
    console.log(address)
    editUserStore.setAddress(address)
  }, [])

  const handleChangePhone = useCallback(e => {
    editUserStore.setPhone(e.target.value)
  }, [])

  const handleChangeNickname = useCallback(e => {
    editUserStore.setNickname(e.target.value)
  }, [])

  const handleChangeTransit = useCallback(() => {
    editUserStore.setCanTransit()
  }, [])

  const handleChangeAboutUs = useCallback(e => {
    editUserStore.setAboutUs(e.target.value)
  }, [])

  const handleChangeRequirementsToAdopt = useCallback(e => {
    editUserStore.setRequirementsToAdopt(e.target.value)
  }, [])

  const handleCancelEdit = useCallback(() => {
    editUserStore.cancelEdit()
  }, [])

  const handleEdit = useCallback(() => {
    editUserStore.setIsEdit()
  }, [])

  const handleSave = useCallback(() => {
    editUserStore.saveUser(authStore.user._id)
  }, [])

  useEffect(() => {
    editUserStore.loadUser(id)
  }, [])

  return (
    <LayoutContainer title="My profile">
      <div className={styles.containerImage}>
        <div className={styles.col}>
          <ImageUserLog
            imgUser={editUserStore.user.image}
            isUserLogin={rootStore.authStore.isLogin}
            size={50}
            isProfile
          />
        </div>
        {editUserStore.isEdit && (
          <div className={c(styles.col, styles.buttonFile)}>
            <input
              onChange={handleChangeImage}
              ref={fileUpload}
              type="file"
              name="file"
              id="file"
              className={styles.inputFile}
            />
            <label onClick={onClickFileUpload} className={c(styles.textInput, styles.btnTertiary)}>
              <MdUpdate className={styles.icon} size={15} />
              <span className={styles.jsFileName}>Choose a file</span>
            </label>
          </div>
        )}
      </div>
      <div className={styles.containerForm}>
        <div className={styles.colInput}>
          <Input
            isEdit={editUserStore.isEdit}
            value={editUserStore.user.name}
            placeholder={t('name')}
          />
        </div>
        <div className={styles.colInput}>
          <Input
            disabled
            isEdit={editUserStore.isEdit}
            value={editUserStore.user.email}
            placeholder={t('email')}
          />
        </div>
        <div className={styles.colInput}>
          <Input
            disabled
            isEdit={editUserStore.isEdit}
            canEdit
            value={editUserStore.nameRol}
            placeholder={t('userRol')}
          />
        </div>
        <div className={styles.colInput}>
          <Input
            handleChange={handleChangePhone}
            isEdit={editUserStore.isEdit}
            canEdit
            value={editUserStore.user.phone}
            placeholder={t('phone')}
          />
        </div>
        <div className={styles.colInput}>
          <div className={styles.messageInformation}>{t('infoNickname')}</div>
          <Input
            handleChange={handleChangeNickname}
            isEdit={editUserStore.isEdit}
            canEdit
            value={editUserStore.user.nickname}
            placeholder={t('nickname')}
          />
        </div>
        <div className={styles.colCheckBox}>
          {editUserStore.rol === 'transitUser' && (
            <InputCheckbox
              handleChange={handleChangeTransit}
              text={t('availableTransit')}
              isEdit={editUserStore.isEdit}
              canEdit
              value={editUserStore.canTransit}
            />
          )}
        </div>
        <div className={styles.colbig}>
          <Textarea
            handleChange={handleChangeAboutUs}
            rows={4}
            isEdit={editUserStore.isEdit}
            canEdit
            value={editUserStore.user.aboutUs}
            placeholder={t('aboutUs')}
          />
        </div>
        <div className={styles.colbig}>
          <Textarea
            handleChange={handleChangeRequirementsToAdopt}
            rows={4}
            isEdit={editUserStore.isEdit}
            canEdit
            value={editUserStore.user.requirementsToAdopt}
            placeholder={t('RequirimentsToAdopt')}
          />
        </div>
        <div className={styles.colbig}>
          <GoogleAutocomplete
            handleChangeTextAddress={handleChangeTextAddress}
            handleChangeAddress={handleChangeAddress}
            isEdit={editUserStore.isEdit}
            value={editUserStore.user.textAddress}
            label={t('addressSearch')}
            placeholder={t('addressSearch')}
          />
          {editUserStore.address.lat && (
            <div className={styles.containerMap}>
              <GoogleMapsLocation
                showAddress
                location={editUserStore.address}
                title={t('createPet.messageMap')}
              />
            </div>
          )}
        </div>
      </div>
      <ButtonsEditFixed
        isEdit={editUserStore.isEdit}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleCancelEdit={handleCancelEdit}
      />
      <Footer />
    </LayoutContainer>
  )
}

export default observer(ProfileUser)
