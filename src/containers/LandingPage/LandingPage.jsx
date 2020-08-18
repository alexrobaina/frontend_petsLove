import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router'
import Footer from 'components/commons/Footer'
import { SEARCH_PETS } from 'routing/routes'
import shelter from './shelter.jpg'
import dev from './dev.jpg'
import vet from './vet.jpg'
import adopter from './adopter.jpg'
import FirstSection from './FirstSection'
import ImageCenter from './ImageCenter'
import CallAction from './CallAction'
import OnlyInformation from './OnlyInformation'
import ExplicationModule from './ExplicationModule'

const LandingPage = () => {
  const history = useHistory()
  const { t } = useTranslation('landingPage')

  const goToSearch = useCallback(() => {
    history.push(SEARCH_PETS)
  }, [])

  return (
    <>
      <FirstSection />
      <CallAction title={t('callAction')} textButton={t('goToSearch')} handleAction={goToSearch} />
      <ImageCenter image={shelter} />
      <OnlyInformation title={t('titleIdeals')} text={t('ideals')} />
      <ExplicationModule
        title={t('responsibleAdoption')}
        text={t('responsibleAdoptionText')}
        image={adopter}
      />
      <ExplicationModule
        mirror
        title={t('titleVolunteers')}
        text={t('textVolunteers')}
        image={dev}
      />
      <ExplicationModule title={t('vetTitle')} text={t('vetText')} image={vet} />
      <Footer />
    </>
  )
}

export default observer(LandingPage)
