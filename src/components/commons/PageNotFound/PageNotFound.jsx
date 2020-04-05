import React from 'react'
import PropTypes from 'prop-types'
import LayoutContainer from '../LayoutContainer'
import Navbar from '../Navbar/Navbar'

const PageNotFound = ({ image, title, text }) => {
  return (
    <>
      <Navbar />
      <LayoutContainer>
        notfound
        {image}
        {title}
        {text}
      </LayoutContainer>
    </>
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
