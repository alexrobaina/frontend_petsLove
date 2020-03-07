import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import Input from 'components/commons/Input'
import LayoutContainer from 'components/commons/LayoutContainer'
import Title from 'components/commons/Title'
import InputSelect from 'components/commons/InputSelect'
import InputCheckbox from 'components/commons/InputCheckbox'
import styles from './createPet.scss'

const CreatePet = () => {
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

  const deleteImage = useCallback(file => {
    const newArray = previews.filter(image => {
      return image.preview === file
    })

    console.log(newArray)
  })

  return (
    <LayoutContainer>
      <Title title={t('Create one pet')} subTitle={t('Es importante saber a quien adopr')} />
      <div className={styles.containerImagePreview}>
        <div>
          {previews &&
            previews.map(image => {
              return (
                <img
                  onClick={() => deleteImage(image)}
                  className={styles.imagePreview}
                  src={image.preview}
                  alt="pets"
                />
              )
            })}
        </div>
      </div>
      <div className={styles.containerForm}>
        <div className={styles.col}>
          <Input
            multiple="true"
            handleChange={handleImageChange}
            type="file"
            placeholder={t('images')}
          />
        </div>
        <div className={styles.col}>
          <Input placeholder={t('Name')} />
        </div>
        <div className={styles.col}>
          <InputSelect placeholder={t('gender')} />
        </div>
        <div className={styles.col}>
          <InputSelect placeholder={t('age')} />
        </div>
        <div className={styles.col}>
          <Input placeholder={t('city')} />
        </div>

        <div className={styles.col}>
          <InputCheckbox text={t('Urgent')} />
        </div>
        <div className={styles.col}>
          <Input placeholder={t('Name')} />
        </div>
      </div>
    </LayoutContainer>
  )
}

CreatePet.propTypes = {}

export default CreatePet
