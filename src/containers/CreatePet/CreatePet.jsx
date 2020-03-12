import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocalStore } from 'mobx-react'
import Input from 'components/commons/Input'
import LayoutContainer from 'components/commons/LayoutContainer'
import Title from 'components/commons/Title'
import InputSelect from 'components/commons/InputSelect'
import InputCheckbox from 'components/commons/InputCheckbox'
import Textarea from 'components/commons/Textarea'
import Footer from 'components/commons/Footer/Footer'
import Button from 'components/commons/Button'
import CreatePetStore from 'stores/CreatePetStore'
import SearchMapStore from 'stores/SearchMapStore'
import MapSearch from 'components/commons/MapSearch'
import styles from './createPet.scss'

const CreatePet = () => {
  const createPetStore = useLocalStore(() => new CreatePetStore())
  const searchMapStore = useLocalStore(() => new SearchMapStore())
  const { t } = useTranslation()

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
    console.log(e.target.value)
    createPetStore.setName(e.target.value)
  }, [])

  const handleChangeLocation = useCallback(location => {
    if (location) {
      createPetStore.setLocation(location)
    }
  }, [])

  const handleChangeCountry = useCallback(e => {
    console.log(e.target.value)
    createPetStore.setCountry(e.target.value)
  }, [])

  const handleChangeCity = useCallback(e => {
    console.log(e.target.value)
    createPetStore.setCity(e.target.value)
  }, [])

  const handleChangeCategory = useCallback(e => {
    console.log(e.target.value)
    createPetStore.setCategory(e.target.value)
  }, [])

  const handleChangeGender = useCallback(e => {
    console.log(e.target.value)
    createPetStore.setGender(e.target.value)
  }, [])

  const handleChangeAge = useCallback(e => {
    console.log(e.target.value)
    createPetStore.setAge(e.target.value)
  }, [])

  const handleChangeHistory = useCallback(e => {
    console.log(e.target.value)
    createPetStore.setHistory(e.target.value)
  }, [])

  const handleChangeRequired = useCallback(e => {
    console.log(e.target.value)
    createPetStore.setRequiredToAdoption(e.target.value)
  }, [])

  const handleChangeActivity = useCallback(e => {
    console.log(e.target.value)
    createPetStore.setActivity(e.target.value)
  }, [])

  return (
    <LayoutContainer>
      <Title title={t('Create pet')} subTitle={t('Create your pets identity')} />
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
          <div className={styles.label}>Add images of pet</div>
          <Input
            multiple="true"
            handleChange={handleImageChange}
            type="file"
            placeholder={t('images')}
          />
        </div>
        <div className={styles.col}>
          <Input handleChange={handleChangeName} placeholder={t('Name')} />
        </div>
        <div className={styles.col}>
          <InputSelect handleChange={handleChangeCountry} placeholder={t('country')} />
        </div>
        <div className={styles.col}>
          <InputSelect handleChange={handleChangeCity} placeholder={t('city')} />
        </div>
        <div className={styles.col}>
          <InputSelect handleChange={handleChangeCategory} placeholder={t('categoryPets')} />
        </div>
        <div className={styles.colLarge}>
          <MapSearch handleChangeLocation={handleChangeLocation} searchMapStore={searchMapStore} />
        </div>
        <div className={styles.col}>
          <InputSelect handleChange={handleChangeGender} placeholder={t('gender')} />
        </div>
        <div className={styles.col}>
          <InputSelect handleChange={handleChangeAge} placeholder={t('age')} />
        </div>
        <div className={styles.col}>
          <Textarea handleChange={handleChangeHistory} placeholder={t('history')} />
        </div>
        <div className={styles.col}>
          <Textarea handleChange={handleChangeRequired} placeholder={t('RequiredToAdoption')} />
        </div>
        <div className={styles.col}>
          <InputSelect handleChange={handleChangeActivity} placeholder={t('activity')} />
        </div>
        <div className={styles.col}>
          <InputCheckbox text={t('urgent')} />
        </div>
        <div className={styles.col}>
          <InputCheckbox text={t('lost')} />
        </div>
        <div className={styles.col}>
          <InputCheckbox text={t('sterilized')} />
        </div>
        <div className={styles.col}>
          <InputCheckbox text={t('vaccinated')} />
        </div>
        <div className={styles.col}>
          <Button bigButton text="Create Pet" />
        </div>
      </div>
      <Footer />
    </LayoutContainer>
  )
}

export default CreatePet
