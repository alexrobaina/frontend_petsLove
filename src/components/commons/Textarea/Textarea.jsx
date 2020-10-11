import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import InputStore from 'stores/InputStore'
import Label from 'components/commons/Label'
import ViewValue from 'components/commons/ViewValue'
import styles from './textarea.scss'

const Textarea = ({ isEdit, value, handleChange, placeholder, rows, cols, inputStore, label }) => {
  const { t } = useTranslation();
  return (
    <>
      {label && isEdit && <Label text={label} />}
      {isEdit ? (
        <textarea
          rows={rows}
          cols={cols}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={c(styles.textarea, inputStore.error && styles.isError)}
        />
      ) : (
        <ViewValue placeholder={placeholder} value={value} />
      )}
      {inputStore && <div className={styles.errorMessage}>{t(inputStore.errorMessage)}</div>}
    </>
  )
}

Textarea.propTypes = {
  cols: PropTypes.number,
  rows: PropTypes.number,
  isEdit: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  inputStore: PropTypes.instanceOf(InputStore),
}

Textarea.defaultProps = {
  cols: 4,
  rows: 4,
  label: '',
  value: '',
  isEdit: false,
  placeholder: '',
  inputStore: false,
}

export default observer(Textarea)
