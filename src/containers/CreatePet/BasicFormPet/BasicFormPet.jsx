import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import InputUploadImage from 'components/commons/InputUploadImage'
import Input from 'components/commons/Input'
import CreatePetStore from 'stores/CreatePetStore'
import LayoutForm from 'components/commons/LayoutForm'
import InputSelect from 'components/commons/InputSelect'
import InputCheckbox from 'components/commons/InputCheckbox'
import Textarea from 'components/commons/Textarea/Textarea'
import styles from './basicFormPet.scss'

const BasicFormPet = ({ createPetStore }) => {
  const { t } = useTranslation('createPet')

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

  const categoryOptions = [
    { value: 'dog', label: t('Dog') },
    { value: 'cat', label: t('Cat') },
  ]

  const genderOptions = [
    { value: 'female', label: t('Female') },
    { value: 'male', label: t('Male') },
  ]

  const activityOptions = [
    { value: 'quiet', label: t('quiet') },
    { value: 'active', label: t('active') },
    { value: 'superActive', label: t('superActive') },
    { value: 'LotsEnergy', label: t('Lots of energy') },
  ]

  const deleteImage = useCallback(image => {
    createPetStore.deleteNewPreviewsImage(image)
  }, [])

  const handleChangeName = useCallback(e => {
    createPetStore.setName(e.target.value)
  }, [])
  const handleChangeHistory = useCallback(e => {
    createPetStore.setHistory(e.target.value)
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

  const handleChangeActivity = useCallback(selectedValue => {
    createPetStore.setActivity(selectedValue)
  }, [])

  const handleChangeLost = useCallback(() => {
    createPetStore.setLost()
  }, [])

  return (
    <LayoutForm>
      <div className={styles.subtitle}>{t('subtitleStepOne')}</div>
      <InputUploadImage
        isEdit
        store={createPetStore}
        deleteImage={deleteImage}
        previewImage={createPetStore.newPreviewsImage}
      />
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          value={createPetStore.pet.lost}
          handleChange={handleChangeLost}
          text={t('lost')}
        />
      </div>
      <div className={styles.colums}>
        <Input
          isEdit
          handleChange={handleChangeName}
          placeholder={t('placeholderName')}
          inputStore={createPetStore.pet.name}
          value={createPetStore.pet.name.value}
        />
      </div>
      <div className={styles.colums}>
        <InputSelect
          isEdit
          options={categoryOptions}
          placeholder={t('categoryPets')}
          handleChange={handleChangeCategory}
          inputStore={createPetStore.pet.category}
          value={createPetStore.pet.category.value}
        />
      </div>
      <div className={styles.colums}>
        <InputSelect
          isEdit
          placeholder={t('gender')}
          options={genderOptions}
          handleChange={handleChangeGender}
          inputStore={createPetStore.pet.gender}
          value={createPetStore.pet.gender.value}
        />
      </div>
      <div className={styles.colums}>
        <InputSelect
          isEdit
          options={ageOptions}
          placeholder={t('age')}
          handleChange={handleChangeAge}
          inputStore={createPetStore.pet.age}
          value={createPetStore.pet.age.value}
        />
      </div>
      <div className={styles.colums}>
        <InputSelect
          isEdit
          options={activityOptions}
          placeholder={t('activity')}
          handleChange={handleChangeActivity}
          inputStore={createPetStore.pet.activityLevel}
          value={createPetStore.pet.activityLevel.value}
        />
      </div>
      <div className={styles.colums}>
        <Textarea
          isEdit
          rows={5}
          label={t('mascotStory')}
          handleChange={handleChangeHistory}
          inputStore={createPetStore.pet.history}
          value={createPetStore.pet.history.value}
        />
      </div>
    </LayoutForm>
  )
}

BasicFormPet.propTypes = {
  createPetStore: PropTypes.instanceOf(CreatePetStore).isRequired,
}

export default observer(BasicFormPet)
