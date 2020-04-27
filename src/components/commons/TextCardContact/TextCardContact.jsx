import React from 'react'
import PropTypes from 'prop-types'
import styles from './textCardContact.scss'
import LayoutCards from '../LayoutCards'

const TextCardContact = ({ phone, email, title }) => {
  return (
    <LayoutCards>
      <div className={styles.contactInformation}>
        <div className={styles.title}>{title}</div>
        <div className={styles.info}>Phone: {phone}</div>
        <div className={styles.info}>Email: {email}</div>
      </div>
    </LayoutCards>
  )
}

TextCardContact.propTypes = {
  title: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
}

export default TextCardContact
