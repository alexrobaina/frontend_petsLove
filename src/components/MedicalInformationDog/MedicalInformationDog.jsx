import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { FaBirthdayCake, FaCalendar, FaCat, FaStreetView } from 'react-icons/fa'
import { IoIosHelpBuoy } from 'react-icons/io'
import LayoutCards from 'components/commons/LayoutCards'
import TextCardInformation from 'components/commons/TextCardInformation'
import styles from './medicalInformationDog.scss'

const MedicalInformationDog = ({ pet, title = '' }) => {
  const { t } = useTranslation('medicalInformationDog')
  
  return (
    <LayoutCards>
      <div className={styles.title}>{title}</div>
      <div className={styles.info}>
        <TextCardInformation
          text={t('lastVisitVet')}
          icon={<FaCalendar size={20} />}
          value={pet.medicalInformationDog.getLastVisitVet}
        />
        <TextCardInformation
          text={t('distemperVaccine')}
          icon={<FaCat size={20} />}
          informationPet={pet.medicalInformationDog.getDistemperVaccine}
        />        
        <TextCardInformation
          text={t('isCastrated')}
          icon={<FaCat size={20} />}
          informationPet={pet.medicalInformationDog.getIsCastrated}
        />
        <TextCardInformation
          text={t('rabiesVaccine')}
          icon={<FaCat size={20} />}
          informationPet={pet.medicalInformationDog.getRabiesVaccine}
        />
        <TextCardInformation
          text={t('hepatitisVaccine')}
          icon={<FaBirthdayCake size={20} />}
          informationPet={pet.medicalInformationDog.getHepatitisVaccine}
        />
        <TextCardInformation
          text={t('parvovirusVaccine')}
          icon={<FaStreetView size={25} />}
          informationPet={pet.medicalInformationDog.getParvovirusVaccine}
        />
        <TextCardInformation
          text={t('leptospirosisVaccine')}
          informationPet={pet.medicalInformationDog.getLeptospirosisVaccine}
          icon={<IoIosHelpBuoy size={25} />}
        />
        <TextCardInformation
          text={t('parainfluenzaVaccine')}
          informationPet={pet.medicalInformationDog.getParainfluenzaVaccine}
          icon={<IoIosHelpBuoy size={25} />}
        />
        <TextCardInformation
          text={t('bordetellaBronchisepticVaccine')}
          informationPet={pet.medicalInformationDog.getBordetellaBronchisepticVaccine}
          icon={<IoIosHelpBuoy size={25} />}
        />
      </div>
    </LayoutCards>
  )
}

MedicalInformationDog.propTypes = {
  pet: PropTypes.node.isRequired,
}

export default observer(MedicalInformationDog)
