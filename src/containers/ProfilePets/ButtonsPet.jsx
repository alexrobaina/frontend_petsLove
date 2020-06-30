import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share'
import useMediaQuery from 'utils/Hooks'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useHistory } from 'react-router'
import { FaWhatsapp } from 'react-icons/fa'
import 'react-phone-input-2/lib/style.css'
import { MdEdit } from 'react-icons/md'
import { SERVER } from 'services/config'
import Button from 'components/commons/Button'
import AlertToast from 'components/commons/AlertToast/AlertToast'
import styles from './buttonsPet.scss'

const ButtonsPet = ({ userCreatorExist, pet, phone }) => {
  const iconsSocialMedia = useMediaQuery('(max-width: 768px)')
  const history = useHistory()

  const editPet = useCallback(id => {
    history.push(`/`)
    history.push(`edit-pet/${id}`)
  }, [])

  const handleWhatsapp = useCallback(() => {
    if (!phone) {
      toast('This user does not have a phone', {
        position: toast.POSITION.TOP_CENTER,
        className: styles.toast,
      })
    } else {
      window.open(`https://api.whatsapp.com/send?phone=${phone}`)
    }
  }, [])

  return (
    <div className={styles.container}>
      <AlertToast />
      <div className={styles.containerButtons}>
        <div className={styles.btnMargin}>
          {userCreatorExist && (
            <Button
              circle
              type="button"
              icon={<MdEdit size={iconsSocialMedia ? 18 : 25} />}
              handleClick={() => editPet(pet._id)}
            />
          )}
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

ButtonsPet.propTypes = {
  phone: PropTypes.string,
  userCreatorExist: PropTypes.bool,
  pet: PropTypes.oneOfType([PropTypes.array]),
}

ButtonsPet.defaultProps = {
  pet: null,
  phone: '',
  userCreatorExist: false,
}

export default observer(ButtonsPet)
