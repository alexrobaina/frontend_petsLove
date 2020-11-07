import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import defaultImage from '../../../public/imageShare.jpg'

const SEO = ({ pageTitle, description, componentName, image }) => {

  return (
    <Helmet defaultTitle="Pets Love">
      <base target="_blank" href="https://pets-love.app" />
      <meta charSet="utf-8" />
      <meta name="twitter:site" content="@robainaAlex" />
      {pageTitle && <title>{`${pageTitle} | Pets Love`}</title>}
      {description && <meta name={description} content={componentName} />}
      {/* {description && <meta name={description} content={componentName} />} */}
      <meta name="og:image" content={image || defaultImage} />
      {/* <html lang="en" amp /> */}
    </Helmet>
  )
}

SEO.propTypes = {
  image: PropTypes.string,
  componentName: PropTypes.string,
  pageTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

SEO.defaultProps = {
  componentName: '',
  image: '',
}

export default SEO
