import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { MdEdit, MdShare } from 'react-icons/md'
import Button from 'components/commons/Button'
import styles from './buttonsPet.scss'

const ButtonsPet = ({ petIsEdit }) => {
  const editPet = useCallback(() => {
    console.log('listo')
  }, [])

  return (
    <div className={styles.containerButtons}>
      <div className={styles.btnMargin}>
        <Button icon={<MdShare size={20} />} circle />
      </div>
      {petIsEdit && (
        <div className={styles.btnMargin}>
          <Button handleClick={editPet} icon={<MdEdit size={20} />} circle />
        </div>
      )}
    </div>
  )
}

ButtonsPet.propTypes = {
  petIsEdit: PropTypes.bool,
}

ButtonsPet.defaultProps = {
  petIsEdit: false,
}

export default observer(ButtonsPet)
