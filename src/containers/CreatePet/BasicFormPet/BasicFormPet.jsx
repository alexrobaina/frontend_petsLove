import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
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
    createPetStore.pet.setName(e.target.value)
  }, [])

  const handleChangeHistory = useCallback(e => {
    createPetStore.pet.setHistory(e.target.value)
  }, [])

  const handleChangeCategory = useCallback(selectedValue => {
    createPetStore.pet.setCategoty(selectedValue.value)
  }, [])

  const handleChangeGender = useCallback(selectedValue => {
    createPetStore.pet.setGender(selectedValue.value)
  }, [])

  const handleDateBirthday = useCallback(selectedValue => {
    createPetStore.pet.setBirthday(selectedValue)
  }, [])

  const handleChangeActivityLevel = useCallback(selectedValue => {
    createPetStore.pet.setActivityLevel(selectedValue.value)
  }, [])

  const handleChangeLost = useCallback(() => {
    createPetStore.pet.setLost()
  }, [])
  
  const handleChangeUrgent = useCallback(() => {
    createPetStore.pet.setUrgent()
  }, [])

  const {
    getLost,
    getName,
    name,
    getUrgent,
    getCategory,
    category,
    getGender,
    gender,
    getActivityLevel,
    activityLevel,
    getBirthday,
    getHistory,
    history,
  } = createPetStore.pet

  return (
    <LayoutForm>
      <div className={styles.subtitle}>{t('subtitleStepOne')}</div>
      <InputUploadImage
        isEdit
        oldImage={createPetStore.pet.getImagePreviews}
        inputUploadImageStore={inputUploadImageStore}
      />
      <div className={styles.colums}>
        <InputCheckbox isEdit text={t('lost')} value={getLost} handleChange={handleChangeLost} />
      </div>
      <div className={styles.colums}>
        <InputCheckbox isEdit text={t('urgent')} value={getUrgent} handleChange={handleChangeUrgent} />
      </div>
      <div className={styles.colums}>
        <Input
          isEdit
          value={getName}
          inputStore={name}
          label={t('common:name')}
          handleChange={handleChangeName}
          placeholder={t('placeholderName')}
        />
      </div>
      <div className={styles.colums}>
        <InputSelect
          isEdit
          value={getCategory}
          inputStore={category}
          options={categoryOptions}
          label={t('common:typePet')}
          placeholder={t('typePets')}
          handleChange={handleChangeCategory}
        />
      </div>
      <div className={styles.colums}>
        <InputSelect
          isEdit
          value={getGender}
          inputStore={gender}
          options={genderOptions}
          label={t('common:gender')}
          placeholder={t('common:gender')}
          handleChange={handleChangeGender}
        />
      </div>
      <div className={styles.colums}>
        <InputDate
          label={t('common:birthday')}
          handleDateChange={handleDateBirthday}
          value={moment(getBirthday).format('L')}
        />
      </div>
      <div className={styles.colums}>
        <InputSelect
          isEdit
          value={getActivityLevel}
          options={activityOptions}
          inputStore={activityLevel}
          placeholder={t('activityLevel')}
          label={t('common:activityLevel')}
          handleChange={handleChangeActivityLevel}
        />
      </div>
      <div className={styles.colums}>
        <Textarea
          isEdit
          rows={5}
          value={getHistory}
          inputStore={history}
          label={t('common:mascotStory')}
          handleChange={handleChangeHistory}
        />
      </div>
    </LayoutForm>
  )
}

BasicFormPet.propTypes = {
  createPetStore: PropTypes.instanceOf(CreatePetStore).isRequired,
}


export default observer(BasicFormPet)
