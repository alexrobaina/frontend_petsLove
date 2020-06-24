import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { FaBirthdayCake, FaCat, FaStreetView, FaUser } from 'react-icons/fa'
import { IoIosHelpBuoy } from 'react-icons/io'
import LayoutCards from 'components/commons/LayoutCards'
import TextCardInformation from 'components/commons/TextCardInformation'
import styles from './medicalInformationCat.scss'

const MedicalInformationCat = ({ pet, title = '' }) => {
  const { t } = useTranslation('medicalInformationCat')

  return (
    <LayoutCards>
      <div className={styles.title}>{title}</div>
      <div className={styles.info}>
        <TextCardInformation
          icon={<FaUser size={20} />}
          value={pet.lastVisitVet.value}
          text={t('Last visit to the vet')}
        />
        <TextCardInformation
          text={t('distemperVaccine')}
          icon={<FaBirthdayCake size={20} />}
          informationPet={pet.distemperVaccine}
        />
        <TextCardInformation
          text={t('rabiesVaccine')}
          icon={<FaCat size={20} />}
          informationPet={pet.rabiesVaccine}
        />
        <TextCardInformation
          text={t('felineFluVaccine')}
          icon={<FaStreetView size={25} />}
          informationPet={pet.felineFluVaccine}
        />
        <TextCardInformation
          text={t('felineLeukemiaVaccine')}
          icon={<IoIosHelpBuoy size={25} />}
          informationPet={pet.felineLeukemiaVaccine}
        />
        <TextCardInformation
          icon={<IoIosHelpBuoy size={25} />}
          text={t('felineInfectiousPeritonitisVaccine')}
          informationPet={pet.felineInfectiousPeritonitisVaccine}
        />
      </div>
    </LayoutCards>
  )
}

MedicalInformationCat.propTypes = {
  pet: PropTypes.node.isRequired,
}

export default MedicalInformationCat
