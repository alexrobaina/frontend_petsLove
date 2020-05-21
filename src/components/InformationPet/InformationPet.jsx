import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { FaBirthdayCake, FaCat, FaStreetView, FaTransgender, FaUser } from 'react-icons/fa'
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
        {pet.userAdopt && (
          <TextCardInformation
            icon={<FaUser size={20} />}
            text={t('User Adopt')}
            value={pet.userAdopt.name}
          />
        )}
        <TextCardInformation
          icon={<FaBirthdayCake size={20} />}
          text={t('age')}
          value={t(`${pet.age}`)}
        />
        <TextCardInformation
          icon={<FaCat size={20} />}
          text={t('category')}
          value={t(`${pet.category}`)}
        />
        <TextCardInformation
          icon={<FaTransgender size={25} />}
          text={t('gender')}
          value={t(`${pet.gender}`)}
        />
        <TextCardInformation
          icon={<GiJumpingDog size={25} />}
          text={t('activity')}
          value={t(`${pet.activity}`)}
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
