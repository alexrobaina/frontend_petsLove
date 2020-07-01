import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { FaCalendar } from 'react-icons/fa'
import { GiLoveInjection } from 'react-icons/gi'
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
          icon={<GiLoveInjection size={20} />}
          informationPet={pet.medicalInformationDog.getDistemperVaccine}
        />
        <TextCardInformation
          text={t('isCastrated')}
          icon={<GiLoveInjection size={20} />}
          informationPet={pet.medicalInformationDog.getIsCastrated}
        />
        <TextCardInformation
          text={t('rabiesVaccine')}
          icon={<GiLoveInjection size={20} />}
          informationPet={pet.medicalInformationDog.getRabiesVaccine}
        />
        <TextCardInformation
          text={t('hepatitisVaccine')}
          icon={<GiLoveInjection size={20} />}
          informationPet={pet.medicalInformationDog.getHepatitisVaccine}
        />
        <TextCardInformation
          text={t('parvovirusVaccine')}
          icon={<GiLoveInjection size={25} />}
          informationPet={pet.medicalInformationDog.getParvovirusVaccine}
        />
        <TextCardInformation
          text={t('leptospirosisVaccine')}
          icon={<GiLoveInjection size={25} />}
          informationPet={pet.medicalInformationDog.getLeptospirosisVaccine}
        />
        <TextCardInformation
          text={t('parainfluenzaVaccine')}
          icon={<GiLoveInjection size={25} />}
          informationPet={pet.medicalInformationDog.getParainfluenzaVaccine}
        />
        <TextCardInformation
          icon={<GiLoveInjection size={25} />}
          text={t('bordetellaBronchisepticVaccine')}
          informationPet={pet.medicalInformationDog.getBordetellaBronchisepticVaccine}
        />
      </div>
    </LayoutCards>
  )
}

MedicalInformationDog.propTypes = {
  pet: PropTypes.node.isRequired,
}

export default observer(MedicalInformationDog)
