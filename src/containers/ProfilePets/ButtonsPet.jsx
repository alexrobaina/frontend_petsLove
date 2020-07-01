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
import PetIdStore from 'stores/PetIdStore'
import Button from 'components/commons/Button'
import AlertToast from 'components/commons/AlertToast/AlertToast'
import styles from './buttonsPet.scss'

const ButtonsPet = ({ store }) => {
  const iconsSocialMedia = useMediaQuery('(max-width: 768px)')
  const history = useHistory()

  const { _id } = store.pet

  const editPet = useCallback(id => {
    history.push(`/`)
    history.push(`edit-pet/${id}`)
  }, [])

  const handleWhatsapp = useCallback(() => {
    if (!store.userCreatorPhone) {
      toast('This user does not have a phone', {
        position: toast.POSITION.TOP_CENTER,
        className: styles.toast,
      })
    } else {
      window.open(`https://api.whatsapp.com/send?phone=${store.userCreatorPhone}`)
    }
  }, [])
  
  return (
    <div className={styles.container}>
      <AlertToast />
      <div className={styles.containerButtons}>
        <div className={styles.btnMargin}>
          {store.pet.userCreator && (
            <Button
              circle
              type="button"
              icon={<MdEdit size={iconsSocialMedia ? 18 : 25} />}
              handleClick={() => editPet(_id)}
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
  store: PropTypes.instanceOf(PetIdStore).isRequired,
}

export default observer(ButtonsPet)
