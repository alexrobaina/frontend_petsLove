import React, { useCallback, useState } from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import useMediaQuery from 'utils/Hooks'
import { useHistory } from 'react-router'
import { FaWhatsapp } from 'react-icons/fa'
import 'react-phone-input-2/lib/style.css'
import { MdEdit } from 'react-icons/md'
import Button from 'components/commons/Button'
import Modal from 'components/commons/Modal/Modal'
import ContactPhone from 'components/commons/ContactPhone'
import styles from './buttonsPet.scss'

const ButtonsPet = ({ petIsEdit, pet, phone, email }) => {
  const [openModal, setOpenModal] = useState(false)
  const { t } = useTranslation('whatsappMessage')
  const isWithBase = useMediaQuery('(max-width: 500px)')
  const history = useHistory()

  const editPet = useCallback((id) => {
    history.push(`/`)
    history.push(`edit-pet/${id}`)
  }, [])

  const handleSendMessage = useCallback((number) => {
    if (number) {
      window.open(
        `https://api.whatsapp.com/send?phone=${number}&text=%20${t('iWantAdopte', '_blank')}`
      )
    }
    setOpenModal()
  }, [])

  const handleToggle = () => {
    if (openModal === false) {
      setOpenModal(true)
    } else {
      setOpenModal(false)
    }
  }

  return (
    <div className={styles.containerButtons}>
      <div className={styles.btnMargin}>
        <Modal
          openModal={openModal}
          handleToggle={handleToggle}
          handleSendMessage={() => handleSendMessage(phone)}
          title={t('contact')}
          notIcon
        >
          <ContactPhone phone={phone} isWithBase={isWithBase} email={email} />
        </Modal>
        <div onClick={handleToggle} className={styles.buttonLink}>
          <FaWhatsapp size={25} />
        </div>
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
