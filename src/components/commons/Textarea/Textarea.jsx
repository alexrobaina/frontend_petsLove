import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { observer } from 'mobx-react'
import InputStore from 'stores/InputStore'
import ViewValue from 'components/commons/ViewValue'
import styles from './textarea.scss'

const Textarea = ({ isEdit, value, handleChange, placeholder, rows, cols, inputStore }) => {
  return (
    <>
      {isEdit ? (
        <textarea
          className={c(styles.textarea, inputStore.error && styles.isError)}
          rows={rows}
          cols={cols}
          defaultValue={value}
          placeholder={placeholder}
          onChange={handleChange}
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
  isEdit: PropTypes.bool,
  inputStore: PropTypes.instanceOf(InputStore),
}

Textarea.defaultProps = {
  cols: 4,
  rows: 4,
  value: '',
  inputStore: false,
  isEdit: false,
}

export default observer(Textarea)
