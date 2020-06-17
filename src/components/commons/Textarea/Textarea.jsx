import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { observer } from 'mobx-react'
import InputStore from 'stores/InputStore'
import ViewValue from 'components/commons/ViewValue'
import styles from './textarea.scss'
import Label from '../Label/Input'

const Textarea = ({ isEdit, value, handleChange, placeholder, rows, cols, inputStore, label }) => {
  return (
    <>
      {label && isEdit && <Label text={label} />}
      {isEdit ? (
        <textarea
          rows={rows}
          cols={cols}
          defaultValue={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={c(styles.textarea, inputStore.error && styles.isError)}
        />
      ) : (
        <ViewValue placeholder={placeholder} value={value} />
      )}
      {inputStore && <div className={styles.errorMessage}>{inputStore.errorMessage}</div>}
    </>
  )
}

Textarea.propTypes = {
  cols: PropTypes.number,
  rows: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  isEdit: PropTypes.bool,
  inputStore: PropTypes.instanceOf(InputStore),
}

Textarea.defaultProps = {
  cols: 4,
  rows: 4,
  label: '',
  value: '',
  inputStore: false,
  isEdit: false,
}

export default observer(Textarea)
