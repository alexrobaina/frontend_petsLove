import React from 'react'
import imagePNF from './pageNotFound.png'
import styles from './pageNotFound.scss'

const PageNotFound = () => {
  return (
    <div className={styles.pageNotFound}>
      <img className={styles.imagePNF} src={imagePNF} alt="Not Found" />
    </div>
  )
}

export default PageNotFound
