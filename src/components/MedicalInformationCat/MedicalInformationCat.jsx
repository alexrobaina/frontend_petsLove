import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { FaBirthdayCake, FaCat, FaStreetView, FaUser } from 'react-icons/fa'
import { IoIosHelpBuoy } from 'react-icons/io'
import LayoutCards from 'components/commons/LayoutCards'
import TextCardInformation from 'components/commons/TextCardInformation'
import styles from './medicalInformationCat.scss'

const MedicalInformationCat = ({ pet }) => {
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
          value={t(`${pet.distemperVaccine}`)}
          icon={<FaBirthdayCake size={20} />}
        />
        <TextCardInformation
          text={t('rabiesVaccine')}
          icon={<FaCat size={20} />}
          value={t(`${pet.rabiesVaccine}`)}
        />
        <TextCardInformation
          text={t('felineFluVaccine')}
          informationPet={pet.felineFluVaccine}
          icon={<FaStreetView size={25} />}
        />
        <TextCardInformation
          text={t('felineLeukemiaVaccine')}
          informationPet={pet.felineLeukemiaVaccine}
          icon={<IoIosHelpBuoy size={25} />}
        />
        <TextCardInformation
          text={t('felineInfectiousPeritonitisVaccine')}
          informationPet={pet.felineInfectiousPeritonitisVaccine}
          icon={<IoIosHelpBuoy size={25} />}
        />
      </div>
    </LayoutCards>
  )
}

MedicalInformationCat.propTypes = {
  pet: PropTypes.node.isRequired,
}

export default MedicalInformationCat
