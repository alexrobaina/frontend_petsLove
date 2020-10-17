import React from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import LayoutContainer from 'components/commons/LayoutContainer'
import InitialFilters from 'components/InitialFilters/InitialFilters'
import LayoutTrantitions from 'components/commons/LayoutTrantitions'
import styles from './search.scss'

const Search = () => {
  const { t } = useTranslation('search')

  return (
    <LayoutContainer>
      <div className={styles.title}>{t('title')}</div>
      <LayoutTrantitions>
        <InitialFilters />
      </LayoutTrantitions>
    </LayoutContainer>
  )
}

export default observer(Search)
