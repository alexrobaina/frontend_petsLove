import React, { useEffect, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { observer } from 'mobx-react'
import UserContext from 'Context/UserContext'
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

  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  const categoryOptions = [
    { value: 'dog', label: t('common:dog') },
    { value: 'cat', label: t('common:cat') },
    { value: 'exotic', label: t('common:exotic') },
  ]

  const genderOptions = [
    { value: 'female', label: t('common:female') },
    { value: 'male', label: t('common:male') },
  ]

  const activityOptions = [
    { value: 'quiet', label: t('common:quiet') },
    { value: 'active', label: t('common:active') },
    { value: 'superActive', label: t('common:superActive') },
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

  const handleChangeUserAdopter = useCallback(selectedValue => {
    createPetStore.pet.setUserAdopter(selectedValue.value)
  }, [])

  const handleChangeUserTransit = useCallback(selectedValue => {
    createPetStore.pet.setUserTransit(selectedValue.value)
  }, [])

  const handleChangeAdopted = useCallback(() => {
    createPetStore.pet.setAdopted()
  }, [])

  const handleChangeLost = useCallback(() => {
    createPetStore.pet.setLost()
  }, [])

  const handleChangeUrgent = useCallback(() => {
    createPetStore.pet.setUrgent()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const {
    name,
    gender,
    getLost,
    getName,
    history,
    category,
    getGender,
    getUrgent,
    getAdopted,
    getHistory,
    getCategory,
    getBirthday,
    userAdopter,
    userTransit,
    activityLevel,
    getImagePreviews,
    getActivityLevel,
    getUserCreatorId,
  } = createPetStore.pet

  const { optionsUserAdopter, optionsUserTransit } = createPetStore

  return (
    <LayoutForm>
      <div className={styles.subtitle}>{t('basicInformation')}</div>
      <InputUploadImage
        isEdit
        oldImage={getImagePreviews}
        createPetStore={createPetStore}
        inputUploadImageStore={inputUploadImageStore}
      />
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          value={getLost}
          text={t('lostLabel')}
          handleChange={handleChangeLost}
        />
      </div>
      <div className={styles.colums}>
        <InputCheckbox
          isEdit
          value={getUrgent}
          text={t('urgentLabel')}
          handleChange={handleChangeUrgent}
        />
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
          placeholder={t('common:typePet')}
          handleChange={handleChangeCategory}
        />
      </div>
      <div className={styles.colums}>
        <InputSelect
          isEdit
          value={getGender}
          inputStore={gender}
          options={genderOptions}
          label={t('common:sex')}
          placeholder={t('common:sex')}
          handleChange={handleChangeGender}
        />
      </div>
      <div className={styles.colums}>
        <InputDate
          label={t('birthdate')}
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
          placeholder={t('placeholderActivityLevel')}
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
      {authStore.user && getUserCreatorId === authStore.user._id && (
        <>
          <div className={styles.colums}>
            <div className={styles.containerStatusPet}>{t('statusPet')}</div>
            <InputSelect
              isEdit
              value={userAdopter.value}
              label={t('labelWhoAdopted', { name: getName })}
              inputStore={userAdopter}
              options={optionsUserAdopter}
              placeholder={t('placeHolderSearchAdopter')}
              handleChange={handleChangeUserAdopter}
            />
          </div>
          <div className={styles.colums}>
            <InputSelect
              isEdit
              value={userTransit.value}
              inputStore={userTransit}
              label={t('labelSelectTransit')}
              options={optionsUserTransit}
              placeholder={t('placeholderSelectTransit')}
              handleChange={handleChangeUserTransit}
            />
          </div>
          <div className={styles.colums}>
            <InputCheckbox
              isEdit
              value={getAdopted}
              text={t('adopted')}
              handleChange={handleChangeAdopted}
            />
          </div>
        </>
      )}
    </LayoutForm>
  )
}

BasicFormPet.propTypes = {
  createPetStore: PropTypes.instanceOf(CreatePetStore).isRequired,
}

export default observer(BasicFormPet)
