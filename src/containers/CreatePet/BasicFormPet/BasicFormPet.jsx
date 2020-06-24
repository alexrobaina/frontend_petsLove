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
import InputDate from '../../../components/commons/InputDate'

const BasicFormPet = ({ createPetStore }) => {
  const { t } = useTranslation('createPet')

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

  const handleDateBirthday = useCallback(selectedValue => {
    createPetStore.setBirthday(selectedValue)
  }, [])

  const handleChangeActivityLevel = useCallback(selectedValue => {
    createPetStore.setActivityLevel(selectedValue)
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
        <InputDate
          label={t('birthday')}
          handleDateChange={handleDateBirthday}
          value={createPetStore.pet.birthday.value}
        />
      </div>
      <div className={styles.colums}>
        <InputSelect
          isEdit
          options={activityOptions}
          placeholder={t('activity')}
          handleChange={handleChangeActivityLevel}
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
