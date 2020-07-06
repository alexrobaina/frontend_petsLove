import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { GiLoveInjection } from 'react-icons/gi'
import moment from 'moment'
import LayoutCards from 'components/commons/LayoutCards'
import TextCardInformation from 'components/commons/TextCardInformation'
import styles from './medicalInformationCat.scss'

const MedicalInformationCat = ({ pet, title = '' }) => {
  const { t } = useTranslation('medicalInformationCat')

  const {
    getLastVisitVet,
    distemperVaccine,
    rabiesVaccine,
    felineFluVaccine,
    felineLeukemiaVaccine,
    felineInfectiousPeritonitisVaccine,
  } = pet.medicalInformationCat
  
  return (
    <LayoutCards>
      <div className={styles.title}>{title}</div>
      <div className={styles.info}>
        <TextCardInformation
          icon={<FaRegCalendarAlt size={20} />}
          value={moment(getLastVisitVet).format('L')}
          text={t('lastVisitVet')}
        />
        <TextCardInformation
          text={t('distemperVaccine')}
          icon={<GiLoveInjection size={20} />}
          informationPet={distemperVaccine}
        />
        <TextCardInformation
          text={t('rabiesVaccine')}
          icon={<GiLoveInjection size={20} />}
          informationPet={rabiesVaccine}
        />
        <TextCardInformation
          text={t('felineFluVaccine')}
          icon={<GiLoveInjection size={25} />}
          informationPet={felineFluVaccine}
        />
        <TextCardInformation
          text={t('felineLeukemiaVaccine')}
          icon={<GiLoveInjection size={25} />}
          informationPet={felineLeukemiaVaccine}
        />
        <TextCardInformation
          icon={<GiLoveInjection size={25} />}
          text={t('felineInfectiousPeritonitisVaccine')}
          informationPet={felineInfectiousPeritonitisVaccine}
        />
      </div>
    </LayoutCards>
  )
}

MedicalInformationCat.propTypes = {
  pet: PropTypes.node.isRequired,
}

export default observer(MedicalInformationCat)
