import React, { useCallback, useState } from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { HOST } from 'services/config'
import { Facebook, Twitter, Pinterest } from 'react-sharingbuttons'
import 'react-sharingbuttons/dist/main.css'
import useMediaQuery from 'utils/Hooks'
import { useHistory } from 'react-router'
import { FaWhatsapp } from 'react-icons/fa'
import 'react-phone-input-2/lib/style.css'
import { MdEdit } from 'react-icons/md'
import Button from 'components/commons/Button'
import Modal from 'components/commons/Modal/Modal'
import ContactPhone from 'components/commons/ContactPhone'
import styles from './buttonsPet.scss'

const ButtonsPet = ({ petIsEdit, pet, phone, email, image }) => {
  const [openModal, setOpenModal] = useState(false)
  const isWithBase = useMediaQuery('(max-width: 500px)')
  const { t } = useTranslation('whatsappMessage')
  const history = useHistory()

  const editPet = useCallback(id => {
    history.push(`/`)
    history.push(`edit-pet/${id}`)
  }, [])

  const handleSendMessage = useCallback(number => {
    if (number) {
      window.open(`https://api.whatsapp.com/send?phone=${number}')}`)
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

  const facebook = {
    title: 'React Sharingbuttons',
    caption: 'Lightweight social sharing buttons for React. No tracking. Just fun.',
    content: `${HOST}/${image}`
  }

  const SHARE_TEXT = 'More info!'
  console.log(`${HOST}/${image}`)
  return (
    <div className={styles.containerButtons}>
      <div className={styles.btnMargin}>
        <Facebook url={window.location.href} />
        <Twitter
          url={window.location.href}
          // shareText={SHARE_TEXT}
        />
        <Pinterest url={window.location.href} mediaSrc={`${HOST}/${image}`} />
      </div>
      <div className={styles.btnMargin}>
        <Modal
          notIcon
          title={t('contact')}
          openModal={openModal}
          handleToggle={handleToggle}
          handleSendMessage={() => handleSendMessage(phone)}
        >
          <div className={styles.textInformation}>{t('descriptionModal')}</div>
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
  phone: PropTypes.string,
  email: PropTypes.string,
  url: PropTypes.string,
  petIsEdit: PropTypes.bool,
  pet: PropTypes.oneOfType([PropTypes.array]).isRequired,
}

ButtonsPet.defaultProps = {
  email: '',
  phone: '',
  url: '',
  petIsEdit: false,
}

export default observer(ButtonsPet)
