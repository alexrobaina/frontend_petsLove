import React, { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import UserContext from 'Context/UserContext'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react'
import { FaWhatsapp } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import Button from 'components/commons/Button'
import styles from './buttonsPet.scss'
import Modal from '../../components/commons/Modal/Modal'

const ButtonsPet = ({ petIsEdit, pet }) => {
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore
  const { t } = useTranslation('whatsappMessage')
  const history = useHistory()
  const editPet = useCallback(id => {
    history.push(`/`)
    history.push(`edit-pet/${id}`)
  }, [])
  const { name } = pet

  return (
    <div className={styles.containerButtons}>
      <div className={styles.btnMargin}>
        <Modal text={'Please write you phone'} title={'Whatsapp message'} notIcon>
          <div className={styles.inputPhone}>
            {/*<InputPhone   */}
          </div>
        </Modal>
        <a
          className={styles.buttonLink}
          target="_blank"
          href={`https://api.whatsapp.com/send?phone=${authStore.user.phone}&text=%20${t(
            'iWantAdopte',
            name
          )}`}
        >
          <FaWhatsapp size={25} />
        </a>
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
