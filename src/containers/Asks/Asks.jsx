import React from 'react'
import { observer } from 'mobx-react'
import imageAsks from './shelter.jpg'
import styles from './asks.scss'
import QuestionAndAnswer from './QuestionAndAnswer/index'

const Asks = () => {
    return( 
      <div className={styles.asksPage}>
        <img className={styles.imagePNF} src={imageAsks} alt="Not Found" />
        <div className={styles.mainTitle}>heloop </div>
        <div className={styles.container}>
          <QuestionAndAnswer question="this is a question?" answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
          <QuestionAndAnswer question="this is a question?" answer="this is an answer" />
          <QuestionAndAnswer question="this is a question?" answer="this is an answer" />
        </div>
      </div>
    )
}

export default observer(Asks)
