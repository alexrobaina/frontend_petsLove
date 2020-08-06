import React, { useCallback, useState } from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share'
import useMediaQuery from 'utils/Hooks'
import { useHistory, useParams } from 'react-router'
import { FaWhatsapp } from 'react-icons/fa'
import 'react-phone-input-2/lib/style.css'
import { MdEdit } from 'react-icons/md'
import Button from 'components/commons/Button'
import AlertToast from 'components/commons/AlertToast/AlertToast'
import styles from './buttonShare.scss'

const ButtonShare = ({ phone, route, canView }) => {
  const { t } = useTranslation()
  const [toggleToast, setToggleToast] = useState(false)
  const iconsSocialMedia = useMediaQuery('(max-width: 768px)')
  const history = useHistory()
  const { id } = useParams()

  const editPet = useCallback(() => {
    history.push(`/`)
    history.push(`${route}/${id}`)
  }, [])

  const handleToggleToast = useCallback(() => {
    setToggleToast(false)
  }, [])

  const handleWhatsapp = useCallback(() => {
    if (phone) {
      window.open(`https://api.whatsapp.com/send?phone=${phone}`)
    } else {
      setToggleToast(true)
    }
  }, [phone])

  return (
    <div className={styles.container}>
      <AlertToast
        text={t('common:callUser')}
        toggleToast={toggleToast}
        handleToggleToast={handleToggleToast}
      />
      <div className={styles.containerButtons}>
        {canView && (
          <div className={styles.btnMargin}>
            <Button
              circle
              type="button"
              handleClick={editPet}
              icon={<MdEdit size={iconsSocialMedia ? 18 : 25} />}
            />
          </div>
        )}
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
  canView: PropTypes.bool,
}

ButtonShare.defaultProps = {
  canView: false,
}

export default observer(ButtonShare)
