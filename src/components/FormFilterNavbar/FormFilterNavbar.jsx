import React from 'react'
import PropTypes from 'prop-types'
import InputSelect from 'components/commons/InputSelect'
import styles from './formFilterNavbar.scss'

function FormFilterNavbar(props) {
  return (
      <div className={styles.InputContainer}>
        <div className={styles.fromNewSearch}>
          <InputSelect placeholder={'Country'} />
        </div>
        <div className={styles.fromNewSearch}>
          <InputSelect placeholder={'city'} />
        </div>
        <div className={styles.fromNewSearch}>
          <InputSelect placeholder={'type of pets'} />
        </div>
        <div className={styles.fromNewSearch}>
          <InputSelect placeholder={'gender'} />
        </div>
        <div className={styles.fromNewSearch}>
          <InputSelect placeholder={'zone'} />
        </div>
      </div>
  )
}

FormFilterNavbar.propTypes = {}

export default FormFilterNavbar
