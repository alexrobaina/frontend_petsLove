import React from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import styles from './questionAndAnswer.scss'

const QuestionAndAnswer = ({question,answer}) => {
    return( 
      <div className={styles.container}>
        <div className={styles.title}>{question} </div>
        <div className={styles.text}>{answer}</div>
      </div>
    )
}

QuestionAndAnswer.propTypes = {
    question: PropTypes.isRequired,
    answer: PropTypes.isRequired
  }

export default observer(QuestionAndAnswer)
