import React, { useCallback, useState } from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share'
import useMediaQuery from 'utils/Hooks'
import { useHistory } from 'react-router'
import { Helmet } from 'react-helmet'
import { FaWhatsapp } from 'react-icons/fa'
import c from 'classnames'
import 'react-phone-input-2/lib/style.css'
import { MdEdit } from 'react-icons/md'
import { SERVER } from 'services/config'
import Button from 'components/commons/Button'
import Modal from 'components/commons/Modal/Modal'
import ContactPhone from 'components/commons/ContactPhone'
import styles from './buttonsPet.scss'

const ButtonsPet = ({ petIsEdit, pet, phone, email, image }) => {
  const [openModal, setOpenModal] = useState(false)
  const isWithBase = useMediaQuery('(max-width: 500px)')
  const iconsSocialMedia = useMediaQuery('(max-width: 400px)')
  const { t } = useTranslation('whatsappMessage')
  const history = useHistory()

  const editPet = useCallback(id => {
    history.push(`/`)
    history.push(`edit-pet/${id}`)
  }, [])

  const handleSendMessage = useCallback(number => {
    if (number) {
      window.open(`https://api.whatsapp.com/send?phone=${number}`)
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile pets</title>
        <meta property="og:image" content={`${SERVER}/${image}`} />
        <meta property="og:image:secure_url" content={`${SERVER}/${image}`} />
      </Helmet>
      <div className={styles.btnMargin}>
        <FacebookShareButton url={window.location.href}>
          <FacebookIcon className={styles.butonsShare} size={iconsSocialMedia ? 30 : 40} />
        </FacebookShareButton>
        <TwitterShareButton url={window.location.href}>
          <TwitterIcon className={styles.butonsShare} size={iconsSocialMedia ? 30 : 40} />
        </TwitterShareButton>
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
        <div
          onClick={handleToggle}
          className={c(styles.buttonLink, iconsSocialMedia && styles.buttonLinkQuery)}
        >
          <FaWhatsapp size={iconsSocialMedia ? 18 : 25} />
        </div>
      </div>
      {petIsEdit && (
        <div className={styles.editButton}>
          <Button
            type="button"
            handleClick={() => editPet(pet._id)}
            icon={<MdEdit size={20} />}
            circle
          />
        </div>
      )}
    </div>
  )
}

ButtonsPet.propTypes = {
  phone: PropTypes.string,
  email: PropTypes.string,
  petIsEdit: PropTypes.bool,
  pet: PropTypes.oneOfType([PropTypes.array]),
}

ButtonsPet.defaultProps = {
  pet: null,
  email: '',
  phone: '',
  petIsEdit: false,
}

export default observer(ButtonsPet)
