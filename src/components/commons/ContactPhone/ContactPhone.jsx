import React from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import PhoneInput from 'react-phone-input-2'
import styles from './contactPhone.scss'

const ContactPhone = ({ phone, isWithBase, email, disabled, error }) => {
  const { t } = useTranslation('whatsappMessage')
  return (
    <div className={styles.containerInput}>
      <div className={styles.inputPhone}>
        {phone !== '' ? (
          <PhoneInput
            country="ar"
            renderStringAsFlag="ar"
            disabled={disabled}
            inputStyle={{
              outline: '0',
              width: '100%',
              height: '40px',
              borderRadius: '4px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: error ? '#f44336' : '#5e92f3',
            }}
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
  error: PropTypes.bool,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  isWithBase: PropTypes.bool.isRequired,
}

ContactPhone.defaultProps = {
  error: false,
  disabled: false,
}

export default ContactPhone
