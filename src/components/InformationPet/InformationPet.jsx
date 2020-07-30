import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import {
  FaCat,
  FaDog,
  FaUserPlus,
  FaStreetView,
  FaTransgender,
  FaUserAstronaut,
  FaRegCalendarAlt,
} from 'react-icons/fa'
import { GiJumpingDog } from 'react-icons/gi'
import { IoIosHelpBuoy } from 'react-icons/io'
import LayoutCards from 'components/commons/LayoutCards'
import Pet from 'models/Pet'
import TextCardInformation from 'components/commons/TextCardInformation'
import styles from './informationPet.scss'

const InformationPet = ({ pet, title }) => {
  const { t } = useTranslation('profilePets')

  const {
    getLost,
    getUrgent,
    getGender,
    getCategory,
    getBirthday,
    getActivityLevel,
    getEmailUserAdopter,
    getEmailUserTransit,
    getEmailUserCreator,
  } = pet

  return (
    <LayoutCards>
      <div className={styles.title}>{title}</div>
      <div className={styles.info}>
        {getEmailUserAdopter && (
          <TextCardInformation
            value={getEmailUserAdopter}
            text={t('common:userAdopter')}
            icon={<FaUserPlus size={20} />}
          />
        )}
        <TextCardInformation
          value={getEmailUserCreator}
          text={t('common:userCreator')}
          icon={<FaUserPlus size={20} />}
        />
        {getEmailUserTransit && (
          <TextCardInformation
            value={getEmailUserTransit}
            text={t('common:userTransit')}
            icon={<FaUserAstronaut size={20} />}
          />
        )}
        <TextCardInformation
          value={pet.getName}
          text={t('common:name')}
          icon={<FaDog size={20} />}
        />
        <TextCardInformation
          text={t('common:birthday')}
          icon={<FaRegCalendarAlt size={20} />}
          value={moment(getBirthday).format('L')}
        />
        <TextCardInformation
          value={t(getCategory)}
          icon={<FaCat size={20} />}
          text={t('common:category')}
        />
        <TextCardInformation
          value={t(getGender)}
          text={t('common:gender')}
          icon={<FaTransgender size={20} />}
        />
        <TextCardInformation
          value={getActivityLevel}
          text={t('common:activityLevel')}
          icon={<GiJumpingDog size={20} />}
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
  title: PropTypes.string,
  pet: PropTypes.instanceOf(Pet).isRequired,
}

InformationPet.defaultProps = {
  title: '',
}

export default InformationPet
