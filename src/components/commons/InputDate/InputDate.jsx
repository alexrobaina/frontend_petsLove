import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker } from '@material-ui/pickers'
import styles from './inputDate.scss'
import Label from '../Label/Input'
import { useTranslation } from 'react-i18next'

const InputDate = ({ label, handleDateChange, value }) => {
  const { t } = useTranslation()
  const [selectedDate, handleDate] = useState(new Date())

  useEffect(() => {
    handleDateChange(selectedDate)
  }, [selectedDate])

  return (
    <div className={styles.containerDate}>
      {label && <Label text={label} />}
      <KeyboardDatePicker
        fullWidth
        margin="normal"
        format={'dd-MM-yyyy'}
        onChange={handleDate}
        id="date-picker-dialog"
        className={styles.inputDate}
        value={selectedDate}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </div>
  )
}

InputDate.propTypes = {
  label: PropTypes.string,
  handleDateChange: PropTypes.func.isRequired,
}

InputDate.defaultProps = {
  label: '',
}

export default InputDate
