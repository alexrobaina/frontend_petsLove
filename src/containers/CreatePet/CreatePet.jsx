import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { MdCancel, MdUpdate } from 'react-icons/md'
import { useHistory, useParams } from 'react-router'
import c from 'classnames'
import Input from 'components/commons/Input'
import LayoutContainer from 'components/commons/LayoutContainer'
import Title from 'components/commons/Title'
import InputSelect from 'components/commons/InputSelect'
import InputCheckbox from 'components/commons/InputCheckbox'
import Textarea from 'components/commons/Textarea'
import CreatePetStore from 'stores/CreatePetStore'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import ButtonsEditFixed from 'components/commons/ButtonsEditFixed'
import UserContext from 'Context/UserContext'
import ButtonsSaveFixed from 'components/commons/ButtonsSaveFixed'
import Loading from 'components/commons/Loading'
import GoogleAutocomplete from 'components/commons/GoogleAutocomplete'
import styles from './createPet.scss'

const CreatePet = () => {
  const { t } = useTranslation('createPet')
  const history = useHistory()
  const { id } = useParams()
  const [onlySave, setOnlySave] = useState(false)
  const fileUpload = useRef()
  const rootStore = useContext(UserContext)
  const { optionsSelectsStore, authStore } = rootStore
  const createPetStore = useLocalStore(() => new CreatePetStore())

  const handleChangeImage = useCallback(e => {
    createPetStore.setImage(e.target.files)

    const fileList = Array.from(e.target.files)

    const mappedFiles = fileList.map(file => ({
      ...file,
      preview: URL.createObjectURL(file),
      imageName: file,
    }))

    createPetStore.setNewsPreviewsImage(mappedFiles)
  })
  
  const ageOptions = [
    { value: '1month', label: t('1month') },
    { value: '2month', label: t('2month') },
    { value: '3month', label: t('3month') },
    { value: '4month', label: t('4month') },
    { value: '5month', label: t('5month') },
    { value: '6month', label: t('6month') },
    { value: '7month', label: t('7month') },
    { value: '8month', label: t('8month') },
    { value: '9month', label: t('9month') },
    { value: '10month', label: t('10month') },
    { value: '11month', label: t('11month') },
    { value: '12month', label: t('12month') },
    { value: '1year', label: t('1year') },
    { value: '2year', label: t('2year') },
    { value: '3year', label: t('3year') },
    { value: '4year', label: t('4year') },
    { value: '5year', label: t('5year') },
    { value: '6year', label: t('6year') },
    { value: '7year', label: t('7year') },
    { value: '8year', label: t('8year') },
    { value: '9year', label: t('9year') },
    { value: '10year', label: t('10year') },
    { value: '11year', label: t('11year') },
    { value: '12year', label: t('12year') },
  ]

  const onClickFileUpload = useCallback(() => {
    fileUpload.current.click()
  }, [])

  const handleChangeName = useCallback(e => {
    createPetStore.setName(e.target.value)
  }, [])

  const handleChangeCategory = useCallback(selectedValue => {
    createPetStore.setCategory(selectedValue)
  }, [])

  const handleChangeAddress = useCallback(address => {
    createPetStore.setAddress(address)
  }, [])

  const handleChangeTextAddress = useCallback(address => {
    createPetStore.setTextAddress(address)
  }, [])

  const handleChangeUrgent = useCallback(() => {
    createPetStore.setUrgent()
  }, [])

  const handleChangeLost = useCallback(() => {
    createPetStore.setLost()
  }, [])

  const handleChangeSterilized = useCallback(() => {
    createPetStore.setSterilized()
  }, [])

  const handleChangeVaccinated = useCallback(() => {
    createPetStore.setVaccinated()
  }, [])

  const handleChangeGender = useCallback(selectedValue => {
    createPetStore.setGender(selectedValue)
  }, [])

  const handleChangeAge = useCallback(selectedValue => {
    createPetStore.setAge(selectedValue)
  }, [])

  const handleChangeHistory = useCallback(e => {
    createPetStore.setHistory(e.target.value)
  }, [])

  const handleChangeRequired = useCallback(e => {
    createPetStore.setRequiredToAdoption(e.target.value)
  }, [])

  const handleChangeActivity = useCallback(selectedValue => {
    createPetStore.setActivity(selectedValue)
  }, [])

  const handleCancelEdit = useCallback(() => {
    createPetStore.setCancelEdit()
  }, [])

  const handleEdit = useCallback(() => {
    createPetStore.setEdit()
  }, [])

  const handleBack = useCallback(() => {
    history.push(`/profile-pets/${id}`)
  }, [])

  const deleteImage = useCallback(image => {
    createPetStore.deleteNewPreviewsImage(image)
  }, [])

  const handleSave = useCallback(() => {
    if (id) {
      createPetStore.saveEdit()
    } else {
      createPetStore.save(authStore.user._id)
    }
  }, [])

  useEffect(() => {
    optionsSelectsStore.listGender()
    optionsSelectsStore.listActiviy()
    optionsSelectsStore.listAges()
    optionsSelectsStore.listCategories()

    if (id) {
      createPetStore.searchPetForId(id)
      createPetStore.setCancelEdit()
    } else {
      createPetStore.setEdit()
      setOnlySave(true)
    }

    if (createPetStore.requestSuccess) {
      history.push('/')
      history.push(`/profile-pets/${createPetStore.idPet}`)
    }
  }, [createPetStore.requestSuccess])

  if (createPetStore.isLoading) {
    return <Loading loadingRing />
  }

  return (
    <LayoutContainer handleBack={handleBack} title={t('title')} textButton={t('backPets')}>
      <Title subTitle={t('subtitle')} />
      <div className={styles.containerImagePreview}>
        {createPetStore.newPreviewsImage &&
          createPetStore.newPreviewsImage.map(image => {
            return (
              <div className={styles.containerImage}>
                <img className={styles.imagePreview} src={image.preview} alt="pets" />
                <div className={styles.middle}>
                  <div onClick={() => deleteImage(image)} className={styles.containerIcon}>
                    <MdCancel className={styles.iconImage} size={20} />
                  </div>
                </div>
              </div>
            )
          })}
      </div>
      <div className={styles.containerForm}>
        {createPetStore.isEdit && (
          <div className={styles.colInputImage}>
            <input
              multiple
              type="file"
              ref={fileUpload}
              className={styles.inputFile}
              onChange={handleChangeImage}
              placeholder={t('placeholderImages')}
            />
            <label onClick={onClickFileUpload} className={c(styles.textInput, styles.btnTertiary)}>
              <MdUpdate className={styles.icon} size={15} />
              <span>{t('addFile')}</span>
            </label>
          </div>
        )}
        <div className={styles.col}>
          <Input
            value={createPetStore.name}
            isEdit={createPetStore.isEdit}
            handleChange={handleChangeName}
            placeholder={t('placeholderName')}
            inputStore={createPetStore.pet.name}
          />
        </div>
        <div className={styles.col}>
          <InputSelect
            isEdit={createPetStore.isEdit}
            placeholder={t('categoryPets')}
            value={createPetStore.category}
            handleChange={handleChangeCategory}
            inputStore={createPetStore.pet.category}
            options={[
              { value: 'dog', label: t('dogs') },
              { value: 'cat', label: t('cats') },
            ]}
          />
        </div>
        <div className={styles.colContainerCheckbox}>
          <div className={styles.colCheckbox}>
            <InputCheckbox
              isEdit
              text={t('urgent')}
              value={createPetStore.pet.urgent}
              handleChange={handleChangeUrgent}
            />
          </div>
          <div className={styles.colCheckbox}>
            <InputCheckbox
              isEdit
              text={t('lost')}
              value={createPetStore.pet.lost}
              handleChange={handleChangeLost}
            />
          </div>
        </div>
        <div className={styles.colContainerCheckbox}>
          <div className={styles.colCheckbox}>
            <InputCheckbox
              isEdit
              text={t('sterilized')}
              value={createPetStore.pet.sterilized}
              handleChange={handleChangeSterilized}
            />
          </div>
          <div className={styles.colCheckbox}>
            <InputCheckbox
              isEdit
              text={t('vaccinated')}
              value={createPetStore.pet.vaccinated}
              handleChange={handleChangeVaccinated}
            />
          </div>
        </div>
        <div className={styles.colMap}>
          <GoogleAutocomplete
            label={t('addAddressPet')}
            isEdit={createPetStore.isEdit}
            placeholder={t('addAddressPet')}
            value={createPetStore.pet.textAddress.value}
            handleChangeAddress={handleChangeAddress}
            inputStoreError={createPetStore.pet.textAddress}
            handleChangeTextAddress={handleChangeTextAddress}
          />
        </div>
        <div className={styles.col}>
          <InputSelect
            placeholder={t('gender')}
            isEdit={createPetStore.isEdit}
            handleChange={handleChangeGender}
            value={createPetStore.pet.gender.value}
            inputStore={createPetStore.pet.gender}
            options={[
              { value: 'female', label: t('female') },
              { value: 'male', label: t('male') },
            ]}
          />
        </div>
        <div className={styles.col}>
          <InputSelect
            placeholder={t('age')}
            value={createPetStore.age}
            handleChange={handleChangeAge}
            isEdit={createPetStore.isEdit}
            options={ageOptions}
          />
        </div>
        <div className={styles.col}>
          <Textarea
            rows={4}
            placeholder={t('history')}
            isEdit={createPetStore.isEdit}
            value={createPetStore.history}
            handleChange={handleChangeHistory}
            inputStore={createPetStore.pet.history}
          />
        </div>
        <div className={styles.col}>
          <Textarea
            rows={4}
            isEdit={createPetStore.isEdit}
            handleChange={handleChangeRequired}
            placeholder={t('RequiredToAdoption')}
            value={createPetStore.requiredToAdoption}
            inputStore={createPetStore.pet.requiredToAdoption}
          />
        </div>
        <div className={styles.col}>
          <InputSelect
            placeholder={t('activity')}
            isEdit={createPetStore.isEdit}
            value={createPetStore.pet.activity.value}
            handleChange={handleChangeActivity}
            inputStore={createPetStore.pet.activity}
            options={[
              { value: 'quiet', label: t('quiet') },
              { value: 'energetic', label: t('energetic') },
              { value: 'superEnergetic', label: t('superEnergetic') },
            ]}
          />
        </div>
        <div className={styles.colMap}>
          <div className={styles.containerMap}>
            <GoogleMapsLocation
              showAddress
              title={t('messageMap')}
              location={createPetStore.location}
              addressValue={{
                lat: createPetStore.pet.lat.value,
                lng: createPetStore.pet.lng.value,
              }}
            />
          </div>
        </div>
        {onlySave && <ButtonsSaveFixed handleSave={handleSave} />}
        {!onlySave && (
          <ButtonsEditFixed
            handleEdit={handleEdit}
            handleSave={handleSave}
            isEdit={createPetStore.isEdit}
            handleCancelEdit={handleCancelEdit}
          />
        )}
      </div>
    </LayoutContainer>
  )
}

export default observer(CreatePet)
