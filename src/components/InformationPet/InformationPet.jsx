import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { FaBirthdayCake, FaCat, FaStreetView, FaTransgender } from 'react-icons/fa'
import { GiJumpingDog, GiLoveInjection } from 'react-icons/gi'
import { IoIosHelpBuoy } from 'react-icons/io'
import { MdPets } from 'react-icons/md'
import LayoutCards from 'components/commons/LayoutCards'
import TextCardInformation from 'components/commons/TextCardInformation'
import styles from './informationPet.scss'

const InformationPet = ({ pet }) => {
  const { t } = useTranslation('profilePets')
  return (
    <LayoutCards>
      <div className={styles.info}>
        <TextCardInformation icon={<FaBirthdayCake size={25} />} text={t('age')} value={pet.age} />
        <TextCardInformation icon={<FaCat size={25} />} text={t('category')} value={pet.category} />
        <TextCardInformation
          icon={<FaTransgender size={25} />}
          text={t('gender')}
          value={pet.gender}
        />
        <TextCardInformation
          icon={<GiJumpingDog size={25} />}
          text={t('activity')}
          value={pet.activity}
        />
        <TextCardInformation
          icon={<FaStreetView size={25} />}
          text={t('lost')}
          informationPet={pet.lost}
        />
        <TextCardInformation
          icon={<GiLoveInjection size={25} />}
          text={t('vaccinated')}
          informationPet={pet.vaccinated}
        />
        <TextCardInformation
          icon={<IoIosHelpBuoy size={25} />}
          text={t('urgent')}
          informationPet={pet.urgent}
        />
        <TextCardInformation
          icon={<MdPets size={25} />}
          text={t('sterilized')}
          informationPet={pet.sterilized}
        />
      </div>
    </LayoutCards>
  )
}

InformationPet.propTypes = {
  pet: PropTypes.node.isRequired,
}

export default InformationPet
