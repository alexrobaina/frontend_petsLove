import React from 'react'
// import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import Navbar from 'components/commons/Navbar/Navbar'
import LayoutContainer from 'components/commons/LayoutContainer'
import styles from './transitUser.scss'

const TransitUser = () => {
  const { t } = useTranslation('transitUser')
  return (
    <Navbar>
      <div className={styles.containerTransit}>
        <LayoutContainer title={t('title')}></LayoutContainer>
      </div>
    </Navbar>
  )
}

// TransitUser.propTypes = {}

export default TransitUser
