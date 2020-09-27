import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { GrEdit } from 'react-icons/gr'
import { AiOutlineFolderView } from 'react-icons/ai'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'
import Tooltip from '@material-ui/core/Tooltip'
import { AWS_STORAGE } from 'services/config'
import Utils from 'utils'
import LayoutCards from 'components/commons/LayoutCards'
import Chips from 'components/commons/Chips'
import noImage from './noImage.svg'
import Button from '../Button/index'
import styles from './cardPets.scss'

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
  textAdress,
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
            <div className={styles.textHistory}>{textAdress && <div>{textAdress}</div>}</div>
          </div>
        </div>
        <div className={styles.tableInfo}>
          <div className={styles.containerItem}>
            <div className={styles.titleItem}>{t('common:type')}</div>
            <div className={styles.infoItem}>
              {t(`common:${category}`)}
              {!category && (
                <span role="img" aria-labelledby="emoji" className={styles.emoji}>
                  🤷‍♀️
                </span>
              )}
            </div>
          </div>
          <div className={styles.containerItem}>
            <div className={styles.titleItem}>
              <div className={styles.titleItem}>{t('common:activityLevel')}</div>
              {activityLevel ? (
                <div className={styles.infoItem}>{t(`common:${activityLevel}`)}</div>
              ) : (
                <span role="img" aria-labelledby="emoji" className={styles.emoji}>
                  🤷‍♀️
                </span>
              )}
            </div>
          </div>
          <div className={styles.containerItem}>
            <div className={styles.titleItem}>{t(`common:gender`)}</div>
            <div className={styles.infoItem}>{t(`common:${gender}`)}</div>
          </div>
        </div>
        {isAdopted && <Chips text={t('adopted')} isAdopted={isAdopted} />}
        <div className={styles.line} />
        <div className={styles.containerButtos}>
          {canEdit && (
            <Tooltip arrow title={t('common:editProfile')}>
              <div>
                <Button
                  circle
                  bigButton
                  text={t('common:edit')}
                  icon={<GrEdit size={20} />}
                  handleClick={() => handleEdit(id)}
                />
              </div>
            </Tooltip>
          )}
          {goToPet && (
            <Tooltip arrow title={t('common:goToProfile')}>
              <div>
                <Button
                  circle
                  bigButton
                  icon={<AiOutlineFolderView size={24} />}
                  text={t('common:goToProfile')}
                  handleClick={() => goToPet(id)}
                />
              </div>
            </Tooltip>
          )}
          {canDelete && (
            <Tooltip arrow title={t('common:deletePet')}>
              <div>
                <Button
                  circle
                  bigButton
                  text={t('common:delete')}
                  handleClick={() => handleDelete(id)}
                  icon={<RiDeleteBin2Line size={24} />}
                />
              </div>
            </Tooltip>
          )}
        </div>
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
