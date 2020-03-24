import React, { useCallback } from 'react'
import { useHistory } from 'react-router'
import LayoutContainer from 'components/commons/LayoutContainer'
import * as Routes from 'routing/routes'
import styles from './dashboard.scss'

const Dashboard = () => {
  const history = useHistory()
  const profilePet = useCallback(() => {
    history.push(Routes.CREATE_PET)
  }, [])

  return (
    <LayoutContainer>
      dashboard
      <div className={styles.linl} onClick={profilePet}>
        profile pet
      </div>
    </LayoutContainer>
  )
}

Dashboard.propTypes = {}

export default Dashboard
