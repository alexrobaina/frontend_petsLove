import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './inputDate.scss'
import { KeyboardDatePicker } from '@material-ui/pickers'
import Label from '../Label/Input'

const InputDate = ({ label, handleDateChange }) => {
  const [selectedDate, handleDate] = useState(new Date())

  useEffect(() => {
    handleDateChange(selectedDate)
  }, [selectedDate])

  return (
    <div className={styles.containerDate}>
      {label && <Label text={label} />}
      <KeyboardDatePicker
        className={styles.inputDate}
        margin="normal"
        id="date-picker-dialog"
        label="Date picker dialog"
        format="MM/dd/yyyy"
        value={selectedDate}
        onChange={handleDate}
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
