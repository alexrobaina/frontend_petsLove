import React from 'react'
import LayoutContainer from 'components/commons/LayoutContainer'
import imagePNF from './ImagePNF.png'
import styles from './pageNotFound.scss'

const PageNotFound = () => {
  return (
    <LayoutContainer>
      <div className={styles.pageNotFound}>
        <img className={styles.imagePNF} src={imagePNF} alt="Not Found" />
        <h2 className={styles.textPNF}>Page Not Found</h2>
      </div>
    </LayoutContainer>
  )
}

export default PageNotFound
