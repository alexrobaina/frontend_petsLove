import React from 'react'
import Footer from 'components/commons/Footer/index'
import ButtonUp from 'components/commons/ScrollUp/index'
import LayoutContainer from 'components/commons/LayoutContainer'
import data from '../../services/AsksService/data.json'
import QuestionAndAnswer from './QuestionAndAnswer/index'
import imageAsks from './shelter.jpg'
import styles from './asks.scss'

const Asks = () => {
    return( 
      <>
        <LayoutContainer>
          <div className={styles. asksPage}>
            <img className={styles.imagePNF} src={imageAsks} alt="Not Found" />
            <div className={styles.mainTitle} />
            <div className={styles.container}>
              {data.map(qAndA => {
                return <QuestionAndAnswer question={qAndA.question} answer={qAndA.answer} />
              })}
            </div>
            <ButtonUp />
          </div>
        </LayoutContainer>
        <Footer />
      </>
    )
}

export default Asks
