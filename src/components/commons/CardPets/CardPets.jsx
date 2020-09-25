import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import Utils from 'utils'
import { useTranslation } from 'react-i18next'
import { AWS_STORAGE } from 'services/config'
import LayoutCards from 'components/commons/LayoutCards'
import Chips from 'components/commons/Chips'
import noImage from './noImage.svg'
import styles from './cardPets.scss'
import Button from '../Button/index'

const CardPets = ({
  id,
  image,
  gender,
  history,
  namePet,
  goToPet,
  canEdit,
  category,
  isAdopted,
  canDelete,
  handleEdit,
  handleDelete,
  activityLevel,
}) => {
  const { t } = useTranslation('petsCard')
  const [isImageNotFound, setIsImageNotFound] = useState(true)
  const utils = new Utils()

  const onError = useCallback(() => {
    setIsImageNotFound(false)
  }, [])

  return (
    <LayoutCards>
      <div className={styles.containerCard}>
        <div className={styles.containerInfo}>
          <div className={styles.borderImage}>
            <img
              onError={onError}
              alt="photos-pets"
              className={styles.imgCard}
              src={image && isImageNotFound ? `${AWS_STORAGE}/${image}` : noImage}
            />
          </div>
          <div className={styles.containerNameText}>
            <div className={styles.name}>{namePet}</div>
            <div className={styles.textHistory}>
              {history ? utils.shortenText(history, 110) : t('notFoundHistory')}
            </div>
          </div>
        </div>
        <div className={styles.tableInfo}>
          <div className={styles.containerItem}>
            <div className={styles.titleItem}>{t('common:type')}</div>
            <div className={styles.infoItem}>{t(`common:${category}`)}</div>
          </div>
          <div className={styles.containerItem}>
            <div className={styles.titleItem}>{t('common:activityLevel')}</div>
            <div className={styles.infoItem}>
              {t(`common:${activityLevel}`)}
              {!activityLevel && <span className={styles.emoji}>🤷‍♀️</span>}
            </div>
          </div>
          <div className={styles.containerItem}>
            <div className={styles.titleItem}>{t('common:gender')}</div>
            <div className={styles.infoItem}>{t(`common:${gender}`)}</div>
          </div>
        </div>
        {/* {isAdopted && <Chips text={t('adopted')} isAdopted={isAdopted} />} */}
        <div className={styles.containerButtos}>
          {canEdit && (
            <Button bigButton handleClick={() => handleEdit(id)} text={t('common:edit')} />
          )}
          {goToPet && (
            <Button bigButton handleClick={() => goToPet(id)} text={t('common:goToProfile')} />
          )}
          {canDelete && (
            <Button bigButton handleClick={() => handleDelete(id)} text={t('common:delete')} />
          )}
        </div>
        {/* <div className={styles.containerDetails}>
          <div className={styles.name}>{namePet}</div>
          <div className={styles.textHistory}>
            {history ? utils.shortenText(history, 110) : t('notFoundHistory')}
          </div>
        </div> */}
      </div>
    </LayoutCards>
  )
}

CardPets.propTypes = {
  goToPet: PropTypes.func,
  isAdopted: PropTypes.bool,
  canEdit: PropTypes.string,
  handleEdit: PropTypes.func,
  canDelete: PropTypes.string,
  handleDelete: PropTypes.func,
  id: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  history: PropTypes.string.isRequired,
  namePet: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  activityLevel: PropTypes.string.isRequired,
  image: PropTypes.oneOfType(PropTypes.string, PropTypes.array),
}

CardPets.defaultProps = {
  image: '',
  goToPet: null,
  canEdit: false,
  canDelete: false,
  isAdopted: false,
  handleEdit: null,
  handleDelete: null,
}

export default CardPets
