import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { observer } from 'mobx-react'
import { FaCalendar } from 'react-icons/fa'
import { GiLoveInjection } from 'react-icons/gi'
import LayoutCards from 'components/commons/LayoutCards'
import TextCardInformation from 'components/commons/TextCardInformation'
import styles from './medicalInformationDog.scss'

const MedicalInformationDog = ({ pet, title = '' }) => {
  const { t } = useTranslation('medicalInformationDog')

  const {
    getLastVisitVet,
    distemperVaccine,
    isCastrated,
    rabiesVaccine,
    hepatitisVaccine,
    parvovirusVaccine,
    leptospirosisVaccine,
    parainfluenzaVaccine,
    bordetellaBronchisepticVaccine,
  } = pet.medicalInformationDog

  return (
    <LayoutCards>
      <div className={styles.title}>{title}</div>
      <div className={styles.info}>
        <TextCardInformation
          text={t('lastVisitVet')}
          icon={<FaCalendar size={20} />}
          value={moment(getLastVisitVet).format('L')}
        />
        <TextCardInformation
          text={t('distemperVaccine')}
          icon={<GiLoveInjection size={20} />}
          informationPet={distemperVaccine}
        />
        <TextCardInformation
          text={t('isCastrated')}
          icon={<GiLoveInjection size={20} />}
          informationPet={isCastrated}
        />
        <TextCardInformation
          text={t('rabiesVaccine')}
          icon={<GiLoveInjection size={20} />}
          informationPet={rabiesVaccine}
        />
        <TextCardInformation
          text={t('hepatitisVaccine')}
          icon={<GiLoveInjection size={20} />}
          informationPet={hepatitisVaccine}
        />
        <TextCardInformation
          text={t('parvovirusVaccine')}
          icon={<GiLoveInjection size={25} />}
          informationPet={parvovirusVaccine}
        />
        <TextCardInformation
          text={t('leptospirosisVaccine')}
          icon={<GiLoveInjection size={25} />}
          informationPet={leptospirosisVaccine}
        />
        <TextCardInformation
          text={t('parainfluenzaVaccine')}
          icon={<GiLoveInjection size={25} />}
          informationPet={parainfluenzaVaccine}
        />
        <TextCardInformation
          icon={<GiLoveInjection size={25} />}
          text={t('bordetellaBronchisepticVaccine')}
          informationPet={bordetellaBronchisepticVaccine}
        />
      </div>
    </LayoutCards>
  )
}

MedicalInformationDog.propTypes = {
  pet: PropTypes.node.isRequired,
}

export default observer(MedicalInformationDog)
