import React, { useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { MdCancel, MdUpdate } from 'react-icons/md'
import c from 'classnames'
import styles from './inputUploadImage.scss'

const InputUploadImage = ({ isEdit, deleteImage, previewImage, createPetStore }) => {
  const { t } = useTranslation('createPet')
  const fileUpload = useRef()

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

  const onClickFileUpload = useCallback(() => {
    fileUpload.current.click()
  }, [])

  return (
    <div>
      <div className={styles.containerImagePreview}>
        {previewImage &&
          previewImage.map(image => {
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
      {isEdit && (
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
    </div>
  )
}

InputUploadImage.propTypes = {
  isEdit: PropTypes.bool,
  deleteImage: PropTypes.func.isRequired,
  previewImage: PropTypes.arrayOf([String]).isRequired,
}

InputUploadImage.defaultProps = {
  isEdit: false,
}

export default InputUploadImage
