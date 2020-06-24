import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { FaBirthdayCake, FaCat, FaStreetView, FaTransgender, FaUser } from 'react-icons/fa'
import { GiJumpingDog } from 'react-icons/gi'
import { IoIosHelpBuoy } from 'react-icons/io'
import LayoutCards from 'components/commons/LayoutCards'
import TextCardInformation from 'components/commons/TextCardInformation'
import styles from './informationPet.scss'

const InformationPet = ({ pet, title }) => {
  const { t } = useTranslation('profilePets')

  return (
    <LayoutCards>
      <div className={styles.title}>{title}</div>
      <div className={styles.info}>
        <TextCardInformation text={t('nam')} value={pet.name.value} icon={<FaUser size={20} />} />
        <TextCardInformation
          text={t('birthday')}
          value={pet.birthday.value}
          icon={<FaBirthdayCake size={20} />}
        />
        <TextCardInformation
          text={t('category')}
          icon={<FaCat size={20} />}
          value={t(`${pet.category.value}`)}
        />
        <TextCardInformation
          text={t('gender')}
          value={t(`${pet.gender.value}`)}
          icon={<FaTransgender size={25} />}
        />
        <TextCardInformation
          text={t('activity')}
          icon={<GiJumpingDog size={25} />}
          value={t(`${pet.activityLevel.value}`)}
        />
        <TextCardInformation
          text={t('lost')}
          informationPet={pet.lost}
          icon={<FaStreetView size={25} />}
        />
        <TextCardInformation
          text={t('urgent')}
          informationPet={pet.urgent}
          icon={<IoIosHelpBuoy size={25} />}
        />
      </div>
    </LayoutCards>
  )
}

InformationPet.propTypes = {
  pet: PropTypes.node.isRequired,
  title: PropTypes.string,
}

InformationPet.defaultProps = {
  title: '',
}

export default InformationPet
