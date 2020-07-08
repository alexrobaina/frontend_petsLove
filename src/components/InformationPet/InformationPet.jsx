import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { FaBirthdayCake, FaCat, FaStreetView, FaTransgender, FaUser } from 'react-icons/fa'
import { GiJumpingDog } from 'react-icons/gi'
import { IoIosHelpBuoy } from 'react-icons/io'
import LayoutCards from 'components/commons/LayoutCards'
import Pet from 'models/Pet'
import TextCardInformation from 'components/commons/TextCardInformation'
import styles from './informationPet.scss'

const InformationPet = ({ pet, title }) => {
  const { t } = useTranslation('profilePets')

  const { getBirthday, getCategory, getGender, getActivityLevel, getLost, getUrgent } = pet

  return (
    <LayoutCards>
      <div className={styles.title}>{title}</div>
      <div className={styles.info}>
        <TextCardInformation text={t('name')} value={pet.getName} icon={<FaUser size={20} />} />
        <TextCardInformation
          text={t('birthday')}
          icon={<FaBirthdayCake size={20} />}
          value={moment(getBirthday).format('L')}
        />
        <TextCardInformation text={t('category')} icon={<FaCat size={20} />} value={getCategory} />
        <TextCardInformation
          text={t('gender')}
          value={getGender}
          icon={<FaTransgender size={25} />}
        />
        <TextCardInformation
          text={t('activity')}
          icon={<GiJumpingDog size={25} />}
          value={getActivityLevel}
        />
        <TextCardInformation text={t('lost')} value={getLost} icon={<FaStreetView size={25} />} />
        <TextCardInformation
          text={t('urgent')}
          value={getUrgent}
          icon={<IoIosHelpBuoy size={25} />}
        />
      </div>
    </LayoutCards>
  )
}

InformationPet.propTypes = {
  pet: PropTypes.instanceOf(Pet).isRequired,
  title: PropTypes.string,
}

InformationPet.defaultProps = {
  title: '',
}

export default InformationPet
