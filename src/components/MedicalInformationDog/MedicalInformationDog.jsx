import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { FaBirthdayCake, FaCat, FaStreetView, FaTransgender, FaUser } from 'react-icons/fa'
import { IoIosHelpBuoy } from 'react-icons/io'
import LayoutCards from 'components/commons/LayoutCards'
import TextCardInformation from 'components/commons/TextCardInformation'
import styles from './medicalInformationDog.scss'

const MedicalInformationDog = ({ pet }) => {
  const { t } = useTranslation('profilePets')

  return (
    <LayoutCards>
      <div className={styles.info}>
        <TextCardInformation
          text={t('lastVisitVet')}
          value={pet.lastVisitVet.value}
          icon={<FaUser size={20} />}
        />
        <TextCardInformation
          text={t('distemperVaccine')}
          value={t(`${pet.rabiesVaccine}`)}
          icon={<FaBirthdayCake size={20} />}
        />
        <TextCardInformation
          text={t('rabiesVaccine')}
          icon={<FaCat size={20} />}
          value={t(`${pet.hepatitisVaccine}`)}
        />
        <TextCardInformation
          text={t('felineFluVaccine')}
          informationPet={pet.leptospirosisVaccine}
          icon={<FaStreetView size={25} />}
        />
        <TextCardInformation
          text={t('felineLeukemiaVaccine')}
          informationPet={pet.parvovirusVaccine}
          icon={<IoIosHelpBuoy size={25} />}
        />
        <TextCardInformation
          text={t('felineInfectiousPeritonitisVaccine')}
          informationPet={pet.parainfluenzaVaccine}
          icon={<IoIosHelpBuoy size={25} />}
        />
        <TextCardInformation
          text={t('felineInfectiousPeritonitisVaccine')}
          informationPet={pet.bordetellaBronchisepticVaccine}
          icon={<IoIosHelpBuoy size={25} />}
        />
      </div>
    </LayoutCards>
  )
}

MedicalInformationDog.propTypes = {
  pet: PropTypes.node.isRequired,
}

export default MedicalInformationDog
