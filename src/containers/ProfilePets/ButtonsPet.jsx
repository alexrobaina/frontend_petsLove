import React, { useCallback, useState } from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { InlineShareButtons } from 'sharethis-reactjs'
import { FacebookShareButton, FacebookIcon, TwitterShareButton } from 'react-share'
import useMediaQuery from 'utils/Hooks'
import { useHistory } from 'react-router'
import { Helmet } from 'react-helmet'
import { FaWhatsapp } from 'react-icons/fa'
import 'react-phone-input-2/lib/style.css'
import { MdEdit } from 'react-icons/md'
import Button from 'components/commons/Button'
import Modal from 'components/commons/Modal/Modal'
import ContactPhone from 'components/commons/ContactPhone'
import styles from './buttonsPet.scss'
import { HOST, SERVER } from '../../services/config'
import LayoutContainer from '../../components/commons/LayoutContainer'

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

  const SHARE_TEXT = 'More info!'
  console.log(`${HOST}/${image}`)

  return (
    <div className={styles.containerButtons}>
      <Helmet>
        <title>Profile pets</title>
        <meta property="og:description" content="Adoption pets" />
        <meta
          property="og:image"
          content="https://petsloveapp.herokuapp.com/_petsLove_ff3c22c2-ccc1-4b5e-868e-8192b7e3650f.jpeg"
        />
        <meta property="og:image:width" content="384" />
        <meta property="og:image:height" content="480" />
        <meta property="og:title" content="pets" />
        <meta property="og:image" content={`${SERVER}/${image}`} />
      </Helmet>
      <div className={styles.btnMargin}>
        <FacebookShareButton
          hashtag
          quote={'asdas'}
          url={`${HOST}/profile-user/5eca91faafbde200178b9cd7`}
          image={`https://petsloveapp.herokuapp.com/_petsLove_ff3c22c2-ccc1-4b5e-868e-8192b7e3650f.jpeg`}
        >
          <FacebookIcon size={25} />
        </FacebookShareButton>
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
