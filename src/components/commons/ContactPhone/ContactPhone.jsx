import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import PhoneInput from 'react-phone-input-2'
import styles from './contactPhone.scss'

const ContactPhone = ({ phone, isWithBase, email }) => {
  const { t } = useTranslation('whatsaapMessage')

  return (
    <div className={styles.containerInput}>
      <div className={styles.inputPhone}>
        {phone !== '' ? (
          <PhoneInput
            value={phone}
            inputStyle={isWithBase ? { width: '260px' } : { width: '100% !important' }}
            country="ar"
            disabled
          />
        ) : (
          <div className={styles.containerEmail}>
            <div className={styles.messageNotEmail}>{t('notPhone')}</div>
            <div className={styles.email}>{email}</div>
          </div>
        )}
      </div>
    </div>
  )
}

ContactPhone.propTypes = {
  phone: PropTypes.string.isRequired,
  isWithBase: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
}

export default ContactPhone
