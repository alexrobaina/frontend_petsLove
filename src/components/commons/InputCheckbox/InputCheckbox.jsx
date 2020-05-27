import React from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Switch from 'react-input-switch'
import c from 'classnames'
import styles from './inputCheckbox.scss'

const InputCheckbox = ({ isEdit, text, handleChange, value }) => {
  return (
    <>
      {isEdit && (
        <div onClick={handleChange} className={styles.container}>
          <div>
            <label className={styles.labelSwitch}>{text}</label>
          </div>
          <div className={styles.containerSwitch}>
            <div className={styles.switch}>
              <Switch
                styles={{
                  track: {
                    borderRadius: '50px',
                    width: '40px',
                    height: '22px',
                    backgroundColor: 'rgba(146, 154, 230, 0.30)',
                  },
                  trackChecked: {
                    backgroundColor: 'rgba(146, 154, 230, 0.30)',
                  },
                  button: {
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#5E92F3',
                    top: '3px',
                  },
                  buttonChecked: {
                    left: '22px',
                    backgroundColor: '#FFD95A',
                  },
                }}
                on="yes"
                off="no"
                value={value ? 'yes' : 'no'}
              />
            </div>
            <div className={styles.containerAnswer}>
              <div className={c(styles.answer, value && styles.isYes)}>{value ? 'yes' : 'no'}</div>
            </div>
          </div>
        </div>
      )}
      {isEdit === false && (
        <>
          {value ? (
            <div className={styles.valueAndLabel}>
              <label className={styles.label}>{text}</label>
              <div className={styles.value}>Yes</div>
            </div>
          ) : (
            <div className={styles.valueAndLabel}>
              <div>
                <label className={styles.label}>{text}</label>
              </div>
              <div>
                <div className={styles.value}>No</div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

InputCheckbox.propTypes = {
  text: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.bool,
  isEdit: PropTypes.bool,
}

InputCheckbox.defaultProps = {
  text: '',
  value: false,
  isEdit: false,
}

export default observer(InputCheckbox)
