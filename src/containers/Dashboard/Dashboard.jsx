import React, { useContext } from 'react'
import LayoutContainer from 'components/commons/LayoutContainer'
import Navbar from 'components/commons/Navbar'
import { Link } from 'react-router-dom'
import { CREATE_PET, PROFILE } from 'routing/routes'
import UserContext from 'Context/UserContext'
import LayoutContainerCard from 'components/commons/LayoutContainerCard'
import iconProfesionals from './businessman.svg'
import styles from './dashboard.scss'

const Dashboard = () => {
  const rootStore = useContext(UserContext)
  const { optionsSelectsStore, searchPetsStore } = rootStore

  return (
    <>
      <Navbar optionsSelectsStore={optionsSelectsStore} searchPetsStore={searchPetsStore} />
      <LayoutContainer>
        <div className={styles.container}>
          <Link to={PROFILE}>
            <div className={styles.cardContainar}>
              <LayoutContainerCard>
                <img className={styles.icon} src={iconProfesionals} alt="profesional-images" />
                <div className={styles.title}>Profile</div>
              </LayoutContainerCard>
            </div>
          </Link>

          <Link to={CREATE_PET}>
            <div className={styles.cardContainar}>
              <LayoutContainerCard>
                <img className={styles.icon} src={iconProfesionals} alt="profesional-images" />
                <div className={styles.title}>Create Pets</div>
              </LayoutContainerCard>
            </div>
          </Link>

          <div className={styles.cardContainar}>
            <LayoutContainerCard>
              <img className={styles.icon} src={iconProfesionals} alt="profesional-images" />
              <div className={styles.title}>Transit home</div>
            </LayoutContainerCard>
          </div>

          <div className={styles.cardContainar}>
            <LayoutContainerCard>
              <img className={styles.icon} src={iconProfesionals} alt="profesional-images" />
              <div className={styles.title}>My Pets</div>
            </LayoutContainerCard>
          </div>

          <div className={styles.cardContainar}>
            <LayoutContainerCard>
              <img className={styles.icon} src={iconProfesionals} alt="profesional-images" />
              <div className={styles.title}>Pets Adopted</div>
            </LayoutContainerCard>
          </div>
        </div>
      </LayoutContainer>
    </>
  )
}

export default Dashboard
