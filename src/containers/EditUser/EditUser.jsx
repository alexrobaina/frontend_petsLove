import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import PhoneInput from 'react-phone-input-2'
import { MdUpdate } from 'react-icons/md'
import { useParams } from 'react-router'
import { observer, useLocalStore } from 'mobx-react'
import UserContext from 'Context/UserContext'
import LayoutContainer from 'components/commons/LayoutContainer'
import Input from 'components/commons/Input'
import Footer from 'components/commons/Footer/Footer'
import ImageUserLog from 'components/commons/ImageUserLog'
import UserStore from 'stores/userStore'
import GoogleAutocomplete from 'components/commons/GoogleAutocomplete/GoogleAutocomplete'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import ButtonsEditFixed from 'components/commons/ButtonsEditFixed'
import Textarea from 'components/commons/Textarea'
import Title from 'components/commons/Title'
import InputCheckbox from 'components/commons/InputCheckbox'
import ViewValue from 'components/commons/ViewValue'
import styles from './editUser.scss'

const EditUser = () => {
  const { id } = useParams()
  const { t } = useTranslation('editUser')
  const fileUpload = useRef()
  const userStore = useLocalStore(() => new UserStore())

  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  const onClickFileUpload = useCallback(() => {
    fileUpload.current.click()
  }, [])

  const handleChangeImage = useCallback(e => {
    userStore.setImage(e.target.files[0])
  })

  const handleChangeTextAddress = useCallback(location => {
    userStore.setTextAddress(location)
  }, [])

  const handleChangeAddress = useCallback(address => {
    userStore.setAddress(address)
  }, [])

  const handleChangePhone = useCallback(phone => {
    userStore.setPhone(phone)
  }, [])

  const handleChangeUsername = useCallback(e => {
    userStore.setUsername(e.target.value)
  }, [])

  const handleChangeTransit = useCallback(() => {
    userStore.setCanTransit()
  }, [])

  const handleChangeAboutUs = useCallback(e => {
    userStore.setAboutUs(e.target.value)
  }, [])

  const handleChangeRequirementsToAdopt = useCallback(e => {
    userStore.setRequirementsToAdopt(e.target.value)
  }, [])

  const handleChangePassword = useCallback(e => {
    userStore.setPassword(e.target.value)
  }, [])

  const handleChangeRepeatPassword = useCallback(e => {
    userStore.setConfirmPassword(e.target.value)
  }, [])

  const handleCancelEdit = useCallback(() => {
    userStore.cancelEdit()
  }, [])

  const handleEdit = useCallback(() => {
    userStore.setIsEdit()
  }, [])

  const handleSave = useCallback(() => {
    userStore.saveUser(authStore.user._id)
  }, [])

  useEffect(() => {
    userStore.loadUser(id)
  }, [])

  return (
    <LayoutContainer title="My profile">
      <div className={styles.containerImage}>
        <div className={styles.col}>
          <ImageUserLog
            size={50}
            isProfile
            imgUser={userStore.user.image}
            isUserLogin={rootStore.authStore.isLogin}
          />
        </div>
        {userStore.isEdit && (
          <div className={c(styles.col, styles.buttonFile)}>
            <input
              ref={fileUpload}
              id="file"
              type="file"
              name="file"
              onChange={handleChangeImage}
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
            disabled
            placeholder={t('name')}
            isEdit={userStore.isEdit}
            inputStore={userStore.user.name}
            value={userStore.user.name.value}
          />
        </div>
        <div className={styles.colInput}>
          <Input
            disabled
            placeholder={t('email')}
            isEdit={userStore.isEdit}
            inputStore={userStore.user.email}
            value={userStore.user.email.value}
          />
        </div>
        <div className={styles.colInput}>
          <Input
            canEdit
            disabled
            isEdit={userStore.isEdit}
            placeholder={t('userRol')}
            value={userStore.user.setRole()}
            inputStore={userStore.user.rol}
          />
        </div>
        <div className={styles.colInput}>
          {userStore.isEdit ? (
            <PhoneInput
              country="ar"
              onChange={phone => handleChangePhone(phone)}
              inputStyle={{ width: '100%', height: '40px' }}
              value={userStore.user.phone.value ? userStore.user.phone.value : ''}
            />
          ) : (
            <ViewValue placeholder={t('phone')} value={userStore.user.phone.value} />
          )}
        </div>
        <div className={styles.colInput}>
          <Input
            canEdit
            isEdit={userStore.isEdit}
            placeholder={t('username')}
            handleChange={handleChangeUsername}
            inputStore={userStore.user.username}
            value={userStore.user.username.value}
          />
          <div className={styles.messageInformation}>{t('helpUserName')}</div>
        </div>
        <div className={styles.colCheckBox}>
          {userStore.rol === 'transitUser' && (
            <InputCheckbox
              canEdit
              isEdit={userStore.isEdit}
              text={t('availableTransit')}
              value={userStore.user.canTransit}
              handleChange={handleChangeTransit}
            />
          )}
        </div>
        <div className={styles.colbig}>
          <Textarea
            canEdit
            rows={4}
            isEdit={userStore.isEdit}
            placeholder={t('aboutUs')}
            handleChange={handleChangeAboutUs}
            inputStore={userStore.user.username}
            value={userStore.user.aboutUs.value}
          />
        </div>
        <div className={styles.colbig}>
          <Textarea
            canEdit
            rows={4}
            isEdit={userStore.isEdit}
            placeholder={t('requirementsToAdopt')}
            handleChange={handleChangeRequirementsToAdopt}
            inputStore={userStore.user.requirementsToAdopt}
            value={userStore.user.requirementsToAdopt.value}
          />
        </div>
        <div className={styles.colbig}>
          <GoogleAutocomplete
            isEdit={userStore.isEdit}
            label={t('address')}
            placeholder={t('address')}
            inputStore={userStore.user.textAddress}
            value={userStore.user.textAddress.value}
            handleChangeAddress={handleChangeAddress}
            handleChangeTextAddress={handleChangeTextAddress}
          />
          <div className={styles.colbig}>
            <GoogleMapsLocation
              showAddress
              title={t('messageMap')}
              location={{
                lat: userStore.user.lat.value,
                lng: userStore.user.lng.value,
              }}
            />
          </div>
        </div>
        <div className={styles.colbig}>
          <Title title={t('titleChangePassword')} />
        </div>
        <div className={styles.colInput}>
          <Input
            canEdit
            type="password"
            isEdit={userStore.isEdit}
            placeholder={t('password')}
            handleChange={handleChangePassword}
            inputStore={userStore.user.password}
          />
          {userStore.passwordError && (
            <div className={styles.errorMessage}>{t('errorPassword')}</div>
          )}
          {userStore.passwordSuccess && (
            <div className={styles.successMessage}>{t('successPassword')}</div>
          )}
        </div>
        <div className={styles.colInput}>
          <Input
            canEdit
            type="password"
            isEdit={userStore.isEdit}
            placeholder={t('repeatPassword')}
            inputStore={userStore.confirmPassword}
            handleChange={handleChangeRepeatPassword}
          />
        </div>
      </div>
      <ButtonsEditFixed
        handleEdit={handleEdit}
        handleSave={handleSave}
        isEdit={userStore.isEdit}
        handleCancelEdit={handleCancelEdit}
      />
      <Footer />
    </LayoutContainer>
  )
}

export default observer(EditUser)
