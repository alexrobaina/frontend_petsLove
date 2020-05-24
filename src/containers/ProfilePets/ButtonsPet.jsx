import React, { useCallback, useState } from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { InlineShareButtons } from 'sharethis-reactjs'
import useMediaQuery from 'utils/Hooks'
import { useHistory } from 'react-router'
import { FaWhatsapp } from 'react-icons/fa'
import 'react-phone-input-2/lib/style.css'
import { MdEdit } from 'react-icons/md'
import Button from 'components/commons/Button'
import Modal from 'components/commons/Modal/Modal'
import ContactPhone from 'components/commons/ContactPhone'
import styles from './buttonsPet.scss'
import { HOST } from '../../services/config'

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
  
  return (
    <div className={styles.containerButtons}>
      <div className={styles.btnMargin}>
        <InlineShareButtons
          config={{
            alignment: 'center', // alignment of buttons (left, center, right)
            color: 'social', // set the color of buttons (social, white)
            enabled: true, // show/hide buttons (true, false)
            font_size: 16, // font size for the buttons
            labels: 'cta', // button labels (cta, counts, null)
            language: 'en', // which language to use (see LANGUAGES)
            networks: [
              // which networks to include (see SHARING NETWORKS)
              // 'whatsapp',
              // 'linkedin',
              // 'messenger',
              'facebook',
              // 'twitter',
            ],
            padding: 12, // padding within buttons (INTEGER)
            radius: 100, // the corner radius on each button (INTEGER)
            show_total: true,
            size: 40, // the size of each button (INTEGER)

            // OPTIONAL PARAMETERS
            url: 'https://petslovefontend.herokuapp.com/profile-user/5e9b2bb674451c8ce836d0a3', // (defaults to current url)
            // image: `${HOST}/${image}`, // (defaults to og:image or twitter:image)
            image: `https://images.unsplash.com/photo-1504595403659-9088ce801e29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80`, // (defaults to og:image or twitter:image)
            description: 'custom text', // (defaults to og:description or twitter:description)
            title: 'custom title', // (defaults to og:title or twitter:title)
            message: 'custom email text', // (only for email sharing)
            subject: 'custom email subject', // (only for email sharing)
            username: 'custom twitter handle', // (only for twitter sharing)
          }}
        />
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
