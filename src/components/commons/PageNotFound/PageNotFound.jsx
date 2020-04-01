import React from 'react'
import PropTypes from 'prop-types'

const PageNotFound = ({ image, title, text }) => {
  return (
    <div>
      notfound
      {image}
      {title}
      {text}
    </div>
  )
}

PageNotFound.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
}

PageNotFound.defaultProps = {
  image: '',
  title: '',
  text: '',
}

export default PageNotFound
