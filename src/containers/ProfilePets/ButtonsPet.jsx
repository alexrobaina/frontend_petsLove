import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react'
import { MdEdit, MdShare } from 'react-icons/md'
import Button from 'components/commons/Button'
import styles from './buttonsPet.scss'

const ButtonsPet = ({ petIsEdit, pet }) => {
  const history = useHistory()
  const editPet = useCallback(id => {
    history.push(`/`)
    history.push(`create-pet/${id}`)
  }, [])

  return (
    <div className={styles.containerButtons}>
      <div className={styles.btnMargin}>
        <Button icon={<MdShare size={20} />} circle />
      </div>
      {petIsEdit && (
        <div className={styles.btnMargin}>
          <Button handleClick={() => editPet(pet._id)} icon={<MdEdit size={20} />} circle />
        </div>
      )}
    </div>
  )
}

ButtonsPet.propTypes = {
  petIsEdit: PropTypes.bool,
  pet: PropTypes.oneOfType([PropTypes.array]).isRequired,
}

ButtonsPet.defaultProps = {
  petIsEdit: false,
}

export default observer(ButtonsPet)
