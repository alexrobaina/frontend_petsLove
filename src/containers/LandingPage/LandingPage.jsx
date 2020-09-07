import React from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import Footer from 'components/commons/Footer'
import shelter from './shelter.jpg'
import dev from './dev.jpg'
import vet from './vet.jpg'
import adopter from './adopter.jpg'
import appImage from './appImage.png'
import FirstSection from './FirstSection'
import ImageCenter from './ImageCenter'
import ContainerAction from './ContainerAction'
import OnlyInformation from './OnlyInformation'
import ExplicationModule from './ExplicationModule'
import CallAction from './CallAction/index'

const LandingPage = () => {
  const { t } = useTranslation('landingPage')

  return (
    <>
      <FirstSection />
      <ImageCenter image={shelter} />
      <ContainerAction />
      <OnlyInformation title={t('titleIdeals')} text={t('ideals')} />
      <CallAction title={t('textAnimalWorld')} />
      <ExplicationModule
        mirror
        image={appImage}
        title={t('usePetsLove')}
        text={t('usePetsLoveExplication')}
      />
      <ExplicationModule
        image={adopter}
        title={t('responsibleAdoption')}
        text={t('responsibleAdoptionText')}
      />
      <ExplicationModule
        mirror
        image={dev}
        text={t('textVolunteers')}
        title={t('titleVolunteers')}
      />
      <ExplicationModule title={t('vetTitle')} text={t('vetText')} image={vet} />
      <Footer />
    </>
  )
}

export default observer(LandingPage)
