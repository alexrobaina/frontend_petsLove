import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share'
import useMediaQuery from 'utils/Hooks'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useHistory, useParams } from 'react-router'
import { FaWhatsapp } from 'react-icons/fa'
import 'react-phone-input-2/lib/style.css'
import { MdEdit } from 'react-icons/md'
import Button from 'components/commons/Button'
import AlertToast from 'components/commons/AlertToast/AlertToast'
import styles from './buttonShare.scss'

const ButtonShare = ({ phone, route }) => {
  const iconsSocialMedia = useMediaQuery('(max-width: 768px)')
  const history = useHistory()
  const { id } = useParams()

  const editPet = useCallback(() => {
    history.push(`/`)
    history.push(`${route}/${id}`)
  }, [])

  const handleWhatsapp = useCallback(() => {
    if (phone) {
      window.open(`https://api.whatsapp.com/send?phone=${phone}`)
    } else {
      toast('This user does not have a phone', {
        position: toast.POSITION.TOP_CENTER,
        className: styles.toast,
      })
    }
  }, [phone])

  return (
    <div className={styles.container}>
      <AlertToast />
      <div className={styles.containerButtons}>
        <div className={styles.btnMargin}>
          <Button
            circle
            type="button"
            handleClick={editPet}
            icon={<MdEdit size={iconsSocialMedia ? 18 : 25} />}
          />
        </div>
        <div className={styles.btnMargin}>
          <FacebookShareButton url={window.location.href}>
            <FacebookIcon className={styles.butonsShare} size={iconsSocialMedia ? 30 : 40} />
          </FacebookShareButton>
        </div>
        <div className={styles.btnMargin}>
          <TwitterShareButton url={window.location.href}>
            <TwitterIcon className={styles.butonsShare} size={iconsSocialMedia ? 30 : 40} />
          </TwitterShareButton>
        </div>
        <div className={styles.btnMargin}>
          <div onClick={handleWhatsapp} className={styles.buttonLink}>
            <FaWhatsapp size={iconsSocialMedia ? 18 : 25} />
          </div>
        </div>
      </div>
    </div>
  )
}

ButtonShare.propTypes = {
  phone: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  route: PropTypes.string.isRequired,
}

export default observer(ButtonShare)
