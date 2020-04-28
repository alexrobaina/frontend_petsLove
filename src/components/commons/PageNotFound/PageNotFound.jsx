import React from 'react'
import LayoutContainer from 'components/commons/LayoutContainer'
import Navbar from 'components/commons/Navbar'
import imagePNF from './ImagePNF.png'
import styles from './pageNotFound.scss'

// a las propiedades no les des vola todavia!! Las agregamos despues
const PageNotFound = () => {
  return (
    <Navbar>
      <LayoutContainer>
        <div className={styles.pageNotFound}>
          <img className={styles.imagePNF} src={imagePNF} alt="Not Found" />
          <h2 className={styles.textPNF}>Page Not Found</h2>
        </div>
      </LayoutContainer>
    </Navbar>
  )
}

export default PageNotFound
