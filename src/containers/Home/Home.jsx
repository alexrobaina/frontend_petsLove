import React from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import SearchPetsStore from 'stores/SearchPetsStore'
import LayoutContainer from 'components/commons/LayoutContainer'
import InitialFilters from 'components/InitialFilters/InitialFilters'
import LayoutTrantitions from 'components/commons/LayoutTrantitions'
import styles from './home.scss'

const Home = () => {
  const { t } = useTranslation('home')
  const searchPetsStore = useLocalStore(() => new SearchPetsStore())

  return (
    <LayoutContainer>
      <div className={styles.title}>{t('title')}</div>
      <LayoutTrantitions>
        <InitialFilters searchPetsStore={searchPetsStore} />
      </LayoutTrantitions>
    </LayoutContainer>
  )
}
export default observer(Home)
