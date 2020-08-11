import React from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import LayoutContainer from 'components/commons/LayoutContainer'
import styles from './landingPage.scss'

const LandingPage = () => {
  const { t } = useTranslation('landingPage')

  return <LayoutContainer title={t('myProfile')}>kasldkalksks</LayoutContainer>
}

export default observer(LandingPage)
