import React from 'react'
import PropTypes from 'prop-types'
import { MdPets } from 'react-icons/md'
import styles from './loading.scss'

const Loading = ({ icon }) => {
  return (
    <div className={styles.ldsHeart}>
      <div />
    </div>
  )
}

Loading.propTypes = {
  icon: PropTypes.node,
}

Loading.defaultProps = {
  icon: <MdPets size={40} />,
}

export default Loading
