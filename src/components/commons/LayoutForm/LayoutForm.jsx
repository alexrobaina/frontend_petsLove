import React from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-animated-css'
import ButtonBack from 'components/commons/ButtonBack'
import styles from './layoutForm.scss'

const LayoutForm = ({ title, information, children, handleBack, viewButtonBack, textButton }) => {
  return (
    <Animated
      animationIn="fadeIn"
      animationOut="fadeInUp"
      animationInDelay={1000}
      animationInDuration={500}
    >
      <div className={styles.containerLayout}>
        {viewButtonBack && <ButtonBack text={textButton} handleClick={handleBack} />}
        <div className={styles.title}>{title}</div>
        <div className={styles.information}>{information}</div>
        {children}
      </div>
    </Animated>
  )
}

LayoutForm.propTypes = {
  children: PropTypes.node.isRequired,
  handleBack: PropTypes.func,
  title: PropTypes.string,
  information: PropTypes.string,
  textButton: PropTypes.string,
  viewButtonBack: PropTypes.bool,
}

LayoutForm.defaultProps = {
  textButton: '',
  title: '',
  information: '',
  handleBack: null,
  viewButtonBack: false,
}

export default LayoutForm
