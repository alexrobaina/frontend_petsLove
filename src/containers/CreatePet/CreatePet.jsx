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
import Button from 'components/commons/Button'
import CreatePetStore from 'stores/CreatePetStore'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import Navbar from 'components/commons/Navbar'
import UserContext from 'Context/UserContext'
import GoogleAutocomplete from 'components/commons/GoogleAutocomplete'
import styles from './createPet.scss'
import ButtonsSaveFixed from '../../components/commons/ButtonsSaveFixed'

const CreatePet = () => {
  const { t } = useTranslation()
  const rootStore = useContext(UserContext)
  const { optionsSelectsStore } = rootStore
  const createPetStore = useLocalStore(() => new CreatePetStore())

  const [previews, setPreviews] = useState([])

  const handleImageChange = useCallback(e => {
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

  const handleChangeLocation = useCallback(location => {
    createPetStore.setLocation(location)
  }, [])

  const handleChangeCountry = useCallback(selectedValue => {
    optionsSelectsStore.setOptionsCities(selectedValue)
    createPetStore.setCountry(selectedValue)
  }, [])

  const handleChangeCity = useCallback(selectedValue => {
    createPetStore.setCity(selectedValue)
  }, [])

  const handleChangeCategory = useCallback(selectedValue => {
    createPetStore.setCategory(selectedValue)
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

  const handleEdit = useCallback(() => {
    createPetStore.setIsEdit()
  }, [])

  useEffect(() => {
    optionsSelectsStore.listContries()
    optionsSelectsStore.listGender()
    optionsSelectsStore.listActiviy()
    optionsSelectsStore.listAges()
  }, [])

  return (
    <Navbar>
      <LayoutContainer>
        <Title title={t('createPet.title')} subTitle={t('createPet.subtitle')} />
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
            <Input
              isEdit={createPetStore.isEdit}
              multiple
              handleChange={handleImageChange}
              type="file"
              placeholder={t('createPet.placeholderImages')}
              value={createPetStore.image}
            />
          </div>
          <div className={styles.col}>
            <Input
              isEdit={createPetStore.isEdit}
              value={createPetStore.name}
              handleChange={handleChangeName}
              placeholder={t('createPet.placeholderName')}
            />
          </div>
          <div className={styles.col}>
            <InputSelect
              isEdit={createPetStore.isEdit}
              options={optionsSelectsStore.countries}
              handleChange={handleChangeCountry}
              placeholder={t('createPet.country')}
            />
          </div>
          <div className={styles.col}>
            <InputSelect
              isEdit={createPetStore.isEdit}
              options={optionsSelectsStore.cities}
              handleChange={handleChangeCity}
              placeholder={t('createPet.city')}
            />
          </div>
          <div className={styles.col}>
            <InputSelect
              isEdit={createPetStore.isEdit}
              options={optionsSelectsStore.categories}
              handleChange={handleChangeCategory}
              placeholder={t('createPet.categoryPets')}
            />
          </div>
          <div className={styles.colLarge}>
            {createPetStore.location.lat && (
              <div className={styles.containerMap}>
                <GoogleMapsLocation
                  showAddress
                  location={createPetStore.location}
                  title={t('createPet.messageMap')}
                />
              </div>
            )}
            <GoogleAutocomplete
              placeholder="Add address pet"
              label="Address pet"
              isEdit={createPetStore.isEdit}
              value={createPetStore.textAddress}
              handleChangeLocation={handleChangeLocation}
            />
          </div>
          <div className={styles.colContainerCheckbox}>
            <div className={styles.colCheckbox}>
              <InputCheckbox
                isEdit={createPetStore.isEdit}
                canEdit
                value={createPetStore.urgent}
                text={t('createPet.urgent')}
              />
            </div>
            <div className={styles.colCheckbox}>
              <InputCheckbox
                isEdit={createPetStore.isEdit}
                canEdit
                value={createPetStore.lost}
                text={t('createPet.lost')}
              />
            </div>
          </div>
          <div className={styles.colContainerCheckbox}>
            <div className={styles.colCheckbox}>
              <InputCheckbox
                isEdit={createPetStore.isEdit}
                canEdit
                value={createPetStore.sterilized}
                text={t('createPet.sterilized')}
              />
            </div>
            <div className={styles.colCheckbox}>
              <InputCheckbox
                isEdit={createPetStore.isEdit}
                canEdit
                value={createPetStore.vaccinated}
                text={t('createPet.vaccinated')}
              />
            </div>
          </div>
          <div className={styles.col}>
            <InputSelect
              isEdit={createPetStore.isEdit}
              value={createPetStore.gender}
              options={optionsSelectsStore.gender}
              handleChange={handleChangeGender}
              placeholder={t('createPet.gender')}
            />
          </div>
          <div className={styles.col}>
            <InputSelect
              isEdit={createPetStore.isEdit}
              value={createPetStore.age}
              options={optionsSelectsStore.ages}
              handleChange={handleChangeAge}
              placeholder={t('createPet.age')}
            />
          </div>
          <div className={styles.col}>
            <Textarea
              isEdit={createPetStore.isEdit}
              rows={4}
              canEdit
              value={createPetStore.history}
              handleChange={handleChangeHistory}
              placeholder={t('createPet.history')}
            />
          </div>
          <div className={styles.col}>
            <Textarea
              isEdit={createPetStore.isEdit}
              rows={4}
              canEdit
              value={createPetStore.requiredToAdoption}
              handleChange={handleChangeRequired}
              placeholder={t('createPet.RequiredToAdoption')}
            />
          </div>
          <div className={styles.col}>
            <InputSelect
              isEdit={createPetStore.isEdit}
              value={createPetStore.activity}
              options={optionsSelectsStore.activity}
              handleChange={handleChangeActivity}
              placeholder={t('createPet.activity')}
            />
          </div>
          <ButtonsSaveFixed
            isEdit={createPetStore.isEdit}
            handleEdit={handleEdit}
            // handleSave={handleSave}
            handleCancelEdit={handleCancelEdit}
          />
        </div>
        <Footer />
      </LayoutContainer>
    </Navbar>
  )
}

export default observer(CreatePet)
