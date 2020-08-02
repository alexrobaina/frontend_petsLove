import React, { useCallback, useContext, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import { toast } from 'react-toastify'
import PhoneInput from 'react-phone-input-2'
import { MdUpdate } from 'react-icons/md'
import { useParams } from 'react-router'
import { observer, useLocalStore } from 'mobx-react'
import UserContext from 'Context/UserContext'
import { TRANSIT_USER } from 'config/roles'
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
import AlertToast from 'components/commons/AlertToast'
import Label from 'components/commons/Label'
import LayoutForm from 'components/commons/LayoutForm'
import styles from './editUser.scss'

const EditUser = () => {
  const { id } = useParams()
  const { t } = useTranslation('editUser')
  const fileUpload = useRef()
  const userStore = useLocalStore(() => new UserStore(id))

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

  const {
    _id,
    name,
    role,
    email,
    phone,
    image,
    aboutUs,
    location,
    password,
    username,
    textAddress,
    isLoadingResizem,
    requirementsToAdopt,
  } = userStore.user

  useEffect(() => {
    if (userStore.isSaved && userStore.isUpdated) {
      authStore.loadUser()
      if (userStore.loadUser(_id)) {
        setTimeout(() => {
          toast(t('common:saveSuccess'), {
            position: toast.POSITION.TOP_RIGHT,
            className: styles.toast,
          })
        }, 500)
      }
    }
  }, [userStore.isSaved, userStore.isUpdated])

  if (userStore.isLoading) {
    return (
      <div className={styles.containerLoading}>
        <Loading loadingRing />
      </div>
    )
  }

  return (
    <LayoutContainer title={t('myProfile')}>
      <AlertToast />
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
                isUserLogin={authStore.isLogin}
                imagePreview={userStore.newPreviewsImage}
              />
            </div>
          )}
          {userStore.isEdit && (
            <div className={c(styles.col, styles.buttonFile)}>
              <input
                id="file"
                type="file"
                name="file"
                ref={fileUpload}
                onChange={handleChangeImage}
                className={styles.inputFile}
              />
              <label
                onClick={onClickFileUpload}
                className={c(styles.textInput, styles.btnTertiary)}
              >
                <MdUpdate className={styles.icon} size={15} />
                <span className={styles.jsFileName}>{t('common:chooseFile')}</span>
              </label>
            </div>
          )}
        </div>
        <div className={styles.containerForm}>
          <div className={styles.colbig}>
            <Input
              disabled
              inputStore={name}
              label={t('common:name')}
              value={name.value}
              placeholder={t('common:name')}
              isEdit={userStore.isEdit}
            />
          </div>
          <div className={styles.colbig}>
            <Input
              disabled
              inputStore={email}
              value={email.value}
              isEdit={userStore.isEdit}
              label={t('common:email')}
              placeholder={t('common:email')}
            />
          </div>
          <div className={styles.colbig}>
            <Input
              canEdit
              disabled
              inputStore={role}
              label={t('common:role')}
              isEdit={userStore.isEdit}
              placeholder={t('common:role')}
              value={userStore.user.getRole()}
            />
          </div>
          <div className={styles.colbig}>
            {userStore.isEdit ? (
              <>
                <Label text={t('common:phone')} />
                <PhoneInput
                  country="ar"
                  value={phone.value.toString()}
                  onChange={phoneNumber => handleChangePhone(phoneNumber)}
                  inputStyle={{
                    width: '100%',
                    height: '40px',
                    borderColor: '#ffd95a',
                    hover: 'red',
                  }}
                />
              </>
            ) : (
              <ViewValue placeholder={t('common:phone')} value={phone.value} />
            )}
          </div>
          <div className={styles.colbig}>
            <Input
              canEdit
              label={t('common:username')}
              inputStore={username}
              value={username.value}
              isEdit={userStore.isEdit}
              placeholder={t('common:username')}
              handleChange={handleChangeUsername}
            />
            <div className={styles.messageInformation}>{t('helpUserName')}</div>
          </div>
          <div className={styles.colbig}>
            {userStore.rol === TRANSIT_USER && (
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
              inputStore={requirementsToAdopt}
              label={t('requirementsToAdopt')}
              value={requirementsToAdopt.value}
              placeholder={t('requirementsToAdopt')}
              handleChange={handleChangeRequirementsToAdopt}
            />
          </div>
          <div className={styles.colbig}>
            <GoogleAutocomplete
              label={t('common:address')}
              isEdit={userStore.isEdit}
              value={textAddress.value}
              placeholder={t('common:address')}
              inputStoreError={textAddress}
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
              inputStore={password}
              isEdit={userStore.isEdit}
              placeholder={t('common:password')}
              handleChange={handleChangePassword}
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
              placeholder={t('common:repeatPassword')}
              inputStore={userStore.confirmPassword}
              handleChange={handleChangeRepeatPassword}
            />
          </div>
        </div>
        <ButtonsEditFixed
          handleEdit={handleEdit}
          handleSave={handleSave}
          isEdit={userStore.isEdit}
          isLoading={userStore.isLoading}
          handleCancelEdit={handleCancelEdit}
        />
      </LayoutForm>
      <Footer />
    </LayoutContainer>
  )
}

export default observer(EditUser)
