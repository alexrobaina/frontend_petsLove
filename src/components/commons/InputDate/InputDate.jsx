import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import c from 'classnames'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Label from 'components/commons/Label'
import styles from './inputDate.scss'

const InputDate = ({ label, handleDateChange, value }) => {
  const [selectedDate, handleDate] = useState(new Date())

  const CustomInput = React.forwardRef((props, ref) => (
    <button ref={ref} type="button" className={styles.input} onClick={props.onClick}>
      {props.value}
    </button>
  ))
  useEffect(() => {
    handleDateChange(selectedDate)
  }, [selectedDate])

  return (
    <>
      {label && <Label text={label} />}
      <div className={c(styles.containerDate, styles.myDatePickerWrapper)}>
        <DatePicker
          value={value}
          showYearDropdown
          dateFormat="dd/MM/yyyy"
          selected={selectedDate}
          customInput={React.cloneElement(<CustomInput />)}
          onChange={date => handleDate(date)}
        />
      </div>
    </>
  )
}

InputDate.propTypes = {
  label: PropTypes.string,
  handleDateChange: PropTypes.func.isRequired,
}

InputDate.defaultProps = {
  label: '',
}

export default observer(InputDate)
