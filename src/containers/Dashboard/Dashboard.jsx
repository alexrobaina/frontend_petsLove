import React, { useCallback } from 'react'
import { useHistory } from 'react-router'
import LayoutContainer from 'components/commons/LayoutContainer'
import * as Routes from 'routing/routes'
import iconProfesionals from './businessman.svg'
import LayoutContainerCard from 'components/commons/LayoutContainerCard'
import styles from './dashboard.scss'

const Dashboard = () => {
  const history = useHistory()

  const createPet = useCallback(() => {
    history.push(Routes.CREATE_PET)
  }, [])

  const profilePet = useCallback(() => {
    history.push(Routes.PROFILE_PET)
  }, [])

  return (
    <LayoutContainer>
      <LayoutContainerCard>
        <div className={styles.container}>
          <img className={styles.icon} src={iconProfesionals} />
          <div className={styles.title}>Transit home</div>
        </div>
      </LayoutContainerCard>
    </LayoutContainer>
  )
}

Dashboard.propTypes = {}

export default Dashboard
