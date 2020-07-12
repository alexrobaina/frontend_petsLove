import React, { useCallback, useContext, useEffect, useRef } from 'react'
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
import Loading from 'components/commons/Loading'
import Title from 'components/commons/Title'
import InputCheckbox from 'components/commons/InputCheckbox'
import ViewValue from 'components/commons/ViewValue'
import Label from 'components/commons/Label/Input'
import LayoutForm from 'components/commons/LayoutForm'
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

    const fileList = Array.from(e.target.files)

    const mappedFiles = fileList.map(file => ({
      ...file,
      preview: URL.createObjectURL(file),
    }))

    userStore.setNewsPreviewsImage(mappedFiles)
  })

  const handleChangeTextAddress = useCallback(location => {
    userStore.setTextAddress(location)
  }, [])

  const handleChangeAddress = useCallback(address => {
    userStore.user.setAddress(address)
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
    userStore.save()
  }, [])

  useEffect(() => {
    userStore.loadUser(id)
  }, [])

  if (userStore.isLoading) {
    return (
      <div className={styles.containerLoading}>
        <Loading loadingRing />
      </div>
    )
  }

  const {
    image,
    isLoadingResizem,
    name,
    email,
    role,
    username,
    aboutUs,
    requirementsToAdopt,
    textAddress,
    location,
    password,
  } = userStore.user

  return (
    <LayoutContainer title={t('title')}>
      <LayoutForm>
        <div className={styles.containerImage}>
          {isLoadingResizem ? (
            <Loading loadingRing />
          ) : (
            <div className={styles.col}>
              <ImageUserLog
                size={50}
                isProfile
                imgUser={image}
                imagePreview={userStore.newPreviewsImage}
                isUserLogin={authStore.isLogin}
              />
            </div>
          )}
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
              <label
                onClick={onClickFileUpload}
                className={c(styles.textInput, styles.btnTertiary)}
              >
                <MdUpdate className={styles.icon} size={15} />
                <span className={styles.jsFileName}>{t('chooseFile')}</span>
              </label>
            </div>
          )}
        </div>
        <div className={styles.containerForm}>
          <div className={styles.colbig}>
            <Input
              disabled
              label={t('name')}
              placeholder={t('name')}
              isEdit={userStore.isEdit}
              inputStore={name}
              value={name.value}
            />
          </div>
          <div className={styles.colbig}>
            <Input
              disabled
              label={t('email')}
              placeholder={t('email')}
              isEdit={userStore.isEdit}
              inputStore={email}
              value={email.value}
            />
          </div>
          <div className={styles.colbig}>
            <Input
              canEdit
              disabled
              value={userStore.user.getRole()}
              label={t('userRol')}
              inputStore={role}
              isEdit={userStore.isEdit}
              placeholder={t('userRol')}
            />
          </div>
          <div className={styles.colbig}>
            {userStore.isEdit ? (
              <>
                <Label text={t('phone')} />
                <PhoneInput
                  country="ar"
                  onChange={phone => handleChangePhone(phone)}
                  inputStyle={{ width: '100%', height: '40px' }}
                />
              </>
            ) : (
              <ViewValue placeholder={t('phone')} value={userStore.user.phone.value} />
            )}
          </div>
          <div className={styles.colbig}>
            <Input
              canEdit
              label={t('username')}
              isEdit={userStore.isEdit}
              placeholder={t('username')}
              handleChange={handleChangeUsername}
              inputStore={username}
              value={username.value}
            />
            <div className={styles.messageInformation}>{t('helpUserName')}</div>
          </div>
          <div className={styles.colbig}>
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
              inputStore={aboutUs}
              label={t('aboutUs')}
              isEdit={userStore.isEdit}
              placeholder={t('aboutUs')}
              handleChange={handleChangeAboutUs}
              value={userStore.user.aboutUs.value}
            />
          </div>
          <div className={styles.colbig}>
            <Textarea
              canEdit
              rows={4}
              isEdit={userStore.isEdit}
              label={t('requirementsToAdopt')}
              placeholder={t('requirementsToAdopt')}
              handleChange={handleChangeRequirementsToAdopt}
              inputStore={requirementsToAdopt}
              value={requirementsToAdopt.value}
            />
          </div>
          <div className={styles.colbig}>
            <GoogleAutocomplete
              label={t('address')}
              isEdit={userStore.isEdit}
              placeholder={t('address')}
              inputStoreError={textAddress}
              value={textAddress.value}
              handleChangeAddress={handleChangeAddress}
              handleChangeTextAddress={handleChangeTextAddress}
            />
            <div className={styles.colbig}>
              <GoogleMapsLocation showAddress title={t('messageMap')} location={location.value} />
            </div>
          </div>
          <div className={styles.colbig}>
            <Title title={t('titleChangePassword')} />
          </div>
          <div className={styles.colbig}>
            <Input
              canEdit
              type="password"
              isEdit={userStore.isEdit}
              placeholder={t('password')}
              handleChange={handleChangePassword}
              inputStore={password}
            />
            {userStore.passwordError && (
              <div className={styles.errorMessage}>{t('errorPassword')}</div>
            )}
            {userStore.passwordSuccess && (
              <div className={styles.successMessage}>{t('successPassword')}</div>
            )}
          </div>
          <div className={styles.colbig}>
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
      </LayoutForm>
      <Footer />
    </LayoutContainer>
  )
}

export default observer(EditUser)
