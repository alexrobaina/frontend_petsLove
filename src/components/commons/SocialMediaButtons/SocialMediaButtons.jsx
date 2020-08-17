import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
import { FaGithub, FaTwitter, FaInstagram, FaFacebookSquare } from 'react-icons/fa'
import styles from './socialMediaButtons.scss'

function SocialMediaButtons({ title }) {
  return (
    <>
      <div className={styles.containerTitle}>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles.container}>
        <Tooltip title={'asd'}>
          <div className={styles.icon}>
            <FaGithub size={35} />
          </div>
        </Tooltip>
        <Tooltip title={'Creador de Pets love'}>
          <div className={styles.icon}>
            <FaTwitter size={39} />
          </div>
        </Tooltip>
        <a href="https://www.instagram.com/petslove.app" target="_blank">
          <div className={styles.icon}>
            <FaInstagram size={35} />
          </div>
        </a>
        <div className={styles.icon}>
          <FaFacebookSquare size={35} />
        </div>
      </div>
    </>
  )
}

SocialMediaButtons.propTypes = {
  title: PropTypes.string,
}

SocialMediaButtons.defaultProps = {
  title: '',
}

export default SocialMediaButtons
