import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react'
import Input from 'components/commons/Input'
import LayoutContainer from 'components/commons/LayoutContainer'
import Title from 'components/commons/Title'
import InputSelect from 'components/commons/InputSelect'
import InputCheckbox from 'components/commons/InputCheckbox'
import Textarea from 'components/commons/Textarea'
import Footer from 'components/commons/Footer/Footer'
import CreatePetStore from 'stores/CreatePetStore'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import Navbar from 'components/commons/Navbar'
import UserContext from 'Context/UserContext'
import ButtonsSaveFixed from 'components/commons/ButtonsSaveFixed'
import GoogleAutocomplete from 'components/commons/GoogleAutocomplete'
import styles from './createPet.scss'

const CreatePet = () => {
  const [addressLocation, setAddress] = useState({})
  const { t } = useTranslation('createPet')
  const rootStore = useContext(UserContext)
  const { optionsSelectsStore, authStore } = rootStore
  const createPetStore = useLocalStore(() => new CreatePetStore())

  const [previews, setPreviews] = useState([])

  const handleChangeImage = useCallback(e => {
    createPetStore.setImage(e.target.files)

    const fileList = Array.from(e.target.files)

    const mappedFiles = fileList.map(file => ({
      ...file,
      preview: URL.createObjectURL(file),
    }))

    setPreviews(mappedFiles)
  })

  const handleChangeName = useCallback(e => {
    createPetStore.setName(e.target.value)
  }, [])

  const handleChangeCategory = useCallback(selectedValue => {
    createPetStore.setCategory(selectedValue)
  }, [])

  const handleChangeAddress = useCallback(address => {
    setAddress(address)
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
    createPetStore.setIsEdit()
  }, [])

  const handleSave = useCallback(() => {
    createPetStore.save(authStore.user._id)
  }, [])

  useEffect(() => {
    optionsSelectsStore.listGender()
    optionsSelectsStore.listActiviy()
    optionsSelectsStore.listAges()
    optionsSelectsStore.listCategories()
  }, [])

  return (
    <Navbar>
      <LayoutContainer title={t('title')}>
        <Title subTitle={t('subtitle')} />
        <div className={styles.containerImagePreview}>
          <div className={styles.rowImagePets}>
            {previews &&
              previews.map(image => {
                return <img className={styles.imagePreview} src={image.preview} alt="pets" />
              })}
          </div>
        </div>
        <div className={styles.containerForm}>
          <div className={styles.colLarge}>
            <input
              multiple
              className={styles.input}
              onChange={handleChangeImage}
              type="file"
              placeholder={t('placeholderImages')}
            />
          </div>
          <div className={styles.col}>
            <Input
              canEdit
              isEdit
              value={createPetStore.name}
              handleChange={handleChangeName}
              placeholder={t('placeholderName')}
            />
          </div>
          <div className={styles.col}>
            <InputSelect
              isEdit
              options={optionsSelectsStore.categories}
              handleChange={handleChangeCategory}
              placeholder={t('categoryPets')}
            />
          </div>
          <div className={styles.colLarge}>
            <GoogleAutocomplete
              isEdit
              label="Address pet"
              placeholder="Add address pet"
              handleChangeTextAddress={handleChangeTextAddress}
              handleChangeAddress={handleChangeAddress}
            />
            {addressLocation.lat && (
              <div className={styles.containerMap}>
                <GoogleMapsLocation
                  showAddress
                  location={addressLocation}
                  title={t('messageMap')}
                />
              </div>
            )}
          </div>
          <div className={styles.colContainerCheckbox}>
            <div className={styles.colCheckbox}>
              <InputCheckbox
                isEdit
                canEdit
                handleChange={handleChangeUrgent}
                value={createPetStore.urgent}
                text={t('urgent')}
              />
            </div>
            <div className={styles.colCheckbox}>
              <InputCheckbox
                handleChange={handleChangeLost}
                isEdit
                canEdit
                value={createPetStore.lost}
                text={t('lost')}
              />
            </div>
          </div>
          <div className={styles.colContainerCheckbox}>
            <div className={styles.colCheckbox}>
              <InputCheckbox
                isEdit
                canEdit
                handleChange={handleChangeSterilized}
                value={createPetStore.sterilized}
                text={t('sterilized')}
              />
            </div>
            <div className={styles.colCheckbox}>
              <InputCheckbox
                isEdit
                canEdit
                handleChange={handleChangeVaccinated}
                value={createPetStore.vaccinated}
                text={t('vaccinated')}
              />
            </div>
          </div>
          <div className={styles.col}>
            <InputSelect
              isEdit
              value={createPetStore.gender}
              options={optionsSelectsStore.gender}
              handleChange={handleChangeGender}
              placeholder={t('gender')}
            />
          </div>
          <div className={styles.col}>
            <InputSelect
              isEdit
              value={createPetStore.age}
              options={optionsSelectsStore.ages}
              handleChange={handleChangeAge}
              placeholder={t('age')}
            />
          </div>
          <div className={styles.col}>
            <Textarea
              isEdit
              rows={4}
              canEdit
              value={createPetStore.history}
              handleChange={handleChangeHistory}
              placeholder={t('history')}
            />
          </div>
          <div className={styles.col}>
            <Textarea
              isEdit
              rows={4}
              canEdit
              value={createPetStore.requiredToAdoption}
              handleChange={handleChangeRequired}
              placeholder={t('RequiredToAdoption')}
            />
          </div>
          <div className={styles.col}>
            <InputSelect
              isEdit
              value={createPetStore.activity}
              options={optionsSelectsStore.activity}
              handleChange={handleChangeActivity}
              placeholder={t('activity')}
            />
          </div>
          <ButtonsSaveFixed onlySave handleSave={handleSave} handleCancelEdit={handleCancelEdit} />
        </div>
        <Footer />
      </LayoutContainer>
    </Navbar>
  )
}

export default observer(CreatePet)
