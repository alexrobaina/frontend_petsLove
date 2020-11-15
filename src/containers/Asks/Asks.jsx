import React from 'react'
import Footer from 'components/commons/Footer/index'
import ButtonUp from 'components/commons/ScrollUp/index'
import { useTranslation } from 'react-i18next'
import SEO from 'components/SEO'
import LayoutContainer from 'components/commons/LayoutContainer'
import data from 'services/AsksService/data.json'
import QuestionAndAnswer from './QuestionAndAnswer'
import imageAsks from './shelter.jpg'
import styles from './asks.scss'

const Asks = () => {
  const { t } = useTranslation('faq')
  return (
    <>
      <SEO pageTitle={t('frequentlyAskedQuestions')} />
      <LayoutContainer>
        <div className={styles.asksPage}>
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
