import React from 'react'
import { observer } from 'mobx-react'
import Footer from 'components/commons/Footer/index'
import ButtonUp from 'components/commons/ScrollUp/index'
import styles from './asks.scss'
import QuestionAndAnswer from './QuestionAndAnswer/index'
import data from '../../services/AsksService/data.json'
import imageAsks from './shelter.jpg'

const Asks = () => {
    return( 
      <div className={styles.asksPage}>
        <img className={styles.imagePNF} src={imageAsks} alt="Not Found" />
        <div className={styles.mainTitle}> </div>
        <div className={styles.container}>
          {data.map(qAndA => {
                      return (
                        <QuestionAndAnswer question={qAndA.question} answer={qAndA.answer} />
                      );
            })}
        </div>
        <ButtonUp />
        <Footer />
      </div>
    )
}

export default observer(Asks)
