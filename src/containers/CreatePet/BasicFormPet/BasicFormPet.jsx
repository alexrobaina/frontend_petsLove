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
import InputDate from 'components/commons/InputDate'
import Textarea from 'components/commons/Textarea/Textarea'
import styles from './basicFormPet.scss'

const BasicFormPet = ({ createPetStore, inputUploadImageStore }) => {
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
        oldImage={createPetStore.pet.getImagePreviews}
        inputUploadImageStore={inputUploadImageStore}
      />
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          text={t('lost')}
          handleChange={handleChangeLost}
          value={createPetStore.pet.lost}
        />
      </div>
      <div className={styles.colums}>
        <Input
          isEdit
          label={t('common:name')}
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
          label={t('common:typePet')}
          placeholder={t('typePets')}
          handleChange={handleChangeCategory}
          inputStore={createPetStore.pet.category}
          value={createPetStore.pet.category.value}
        />
      </div>
      <div className={styles.colums}>
        <InputSelect
          isEdit
          options={genderOptions}
          placeholder={t('common:gender')}
          label={t('common:gender')}
          handleChange={handleChangeGender}
          inputStore={createPetStore.pet.gender}
          value={createPetStore.pet.gender.value}
        />
      </div>
      <div className={styles.colums}>
        <InputDate
          label={t('common:birthday')}
          handleDateChange={handleDateBirthday}
          value={createPetStore.pet.birthdayFormatView}
        />
      </div>
      <div className={styles.colums}>
        <InputSelect
          isEdit
          options={activityOptions}
          placeholder={t('activityLevel')}
          label={t('common:activityLevel')}
          handleChange={handleChangeActivityLevel}
          inputStore={createPetStore.pet.activityLevel}
          value={createPetStore.pet.activityLevel.value}
        />
      </div>
      <div className={styles.colums}>
        <Textarea
          isEdit
          rows={5}
          label={t('common:mascotStory')}
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
  isEdition: PropTypes.bool,
}

BasicFormPet.defaultProps = {
  isEdition: false,
}

export default observer(BasicFormPet)
