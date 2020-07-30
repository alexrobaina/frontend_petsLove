import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { observer } from 'mobx-react'
import { FaCalendar, FaUserMd } from "react-icons/fa";
import { GiLoveInjection } from 'react-icons/gi'
import Pet from 'models/Pet'
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
          icon={<FaCalendar size={18} />}
          value={moment(getLastVisitVet).format('L')}
        />
        {pet.getEmailUserVet && (
          <TextCardInformation
            text={t('common:userVeterinary')}
            icon={<FaUserMd size={18} />}
            value={pet.getEmailUserVet}
          />
        )}
        <TextCardInformation
          text={t('distemperVaccine')}
          icon={<GiLoveInjection size={20} />}
          value={distemperVaccine}
        />
        <TextCardInformation
          text={t('isCastrated')}
          icon={<GiLoveInjection size={20} />}
          value={isCastrated}
        />
        <TextCardInformation
          text={t('rabiesVaccine')}
          icon={<GiLoveInjection size={20} />}
          value={rabiesVaccine}
        />
        <TextCardInformation
          text={t('hepatitisVaccine')}
          icon={<GiLoveInjection size={20} />}
          value={hepatitisVaccine}
        />
        <TextCardInformation
          text={t('parvovirusVaccine')}
          icon={<GiLoveInjection size={20} />}
          value={parvovirusVaccine}
        />
        <TextCardInformation
          text={t('leptospirosisVaccine')}
          icon={<GiLoveInjection size={20} />}
          value={leptospirosisVaccine}
        />
        <TextCardInformation
          text={t('parainfluenzaVaccine')}
          icon={<GiLoveInjection size={20} />}
          value={parainfluenzaVaccine}
        />
        <TextCardInformation
          icon={<GiLoveInjection size={20} />}
          text={t('bordetellaBronchisepticVaccine')}
          value={bordetellaBronchisepticVaccine}
        />
      </div>
    </LayoutCards>
  )
}

MedicalInformationDog.propTypes = {
  pet: PropTypes.instanceOf(Pet).isRequired,
}

export default observer(MedicalInformationDog)
