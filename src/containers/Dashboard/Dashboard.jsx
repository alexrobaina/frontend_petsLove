import React from 'react'
import LayoutContainer from 'components/commons/LayoutContainer'
import Navbar from 'components/commons/Navbar'
import LayoutContainerCard from 'components/commons/LayoutContainerCard'
import iconProfesionals from './businessman.svg'
import styles from './dashboard.scss'

const Dashboard = () => {
  return (
    <Navbar>
      <LayoutContainer>
        <div className={styles.container}>
          <LayoutContainerCard>
            <div className={styles.cardContainar}>
              <div className={styles.card}>
                <div className={styles.containerText}>
                  <div className={styles.title}>Pets adopted</div>
                  <div className={styles.number}>0</div>
                </div>
                <img className={styles.icon} src={iconProfesionals} alt="profesional-images" />
              </div>
            </div>
          </LayoutContainerCard>
          <LayoutContainerCard>
            <div className={styles.cardContainar}>
              <div className={styles.card}>
                <div className={styles.containerText}>
                  <div className={styles.title}>active volunteers</div>
                  <div className={styles.number}>0</div>
                </div>
                <img className={styles.icon} src={iconProfesionals} alt="profesional-images" />
              </div>
            </div>
          </LayoutContainerCard>
          <LayoutContainerCard>
            <div className={styles.cardContainar}>
              <div className={styles.card}>
                <div className={styles.containerText}>
                  <div className={styles.title}>In the shelter</div>
                  <div className={styles.number}>0</div>
                </div>
                <img className={styles.icon} src={iconProfesionals} alt="profesional-images" />
              </div>
            </div>
          </LayoutContainerCard>
        </div>
      </LayoutContainer>
    </Navbar>
  )
}

export default Dashboard
