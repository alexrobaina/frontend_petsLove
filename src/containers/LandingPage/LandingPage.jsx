import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
// import { useHistory } from 'react-router'
import Footer from 'components/commons/Footer'
import { SEARCH_PETS } from 'routing/routes'
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

const LandingPage = () => {
  // const history = useHistory()
  const { t } = useTranslation('landingPage')

  // const goToSearch = useCallback(() => {
  //   history.push(SEARCH_PETS)
  // }, [])

  return (
    <>
      <FirstSection />
      <ImageCenter image={shelter} />
      <ContainerAction />
      <OnlyInformation title={t('titleIdeals')} text={t('ideals')} />
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
