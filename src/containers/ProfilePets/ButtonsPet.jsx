import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { MdCall, MdEdit, MdShare } from 'react-icons/md'
import Button from 'components/commons/Button'
import Modal from 'components/commons/Modal'
import styles from './buttonsPet.scss'

const ButtonsPet = ({ isEdit }) => {
  return (
    <div className={styles.containerButtons}>
      {isEdit && (
        <div className={c(styles.button, styles.btnMargin)}>
          <Button icon={<MdShare size={20} />} circle text="Edit" />
        </div>
      )}
      <div className={c(styles.button, styles.btnMargin)}>
        <Modal
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          icon={<MdCall size={20} />}
          title="Contact to protectionist"
          textButtonOpen="Adopt pet"
        />
      </div>
      <div className={c(styles.button, styles.btnMargin)}>
        <Button icon={<MdEdit size={20} />} circle text="Edit" />
      </div>
    </div>
  )
}

ButtonsPet.propTypes = {
  isEdit: PropTypes.bool,
}

ButtonsPet.defaultProps = {
  isEdit: false,
}

export default ButtonsPet
