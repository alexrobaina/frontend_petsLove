import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'

const SEO = ({ pageTitle, description, componentName, image }) => {
  const defaultImage =
    'https://elasticbeanstalk-us-west-1-867379966079.s3-us-west-1.amazonaws.com/imageShare/imageShare.jpg'

  return (
    <Helmet defaultTitle="Pets Love">
      <base target="_blank" href="https://pets-love.app" />
      <meta charSet="utf-8" />
      <meta name="twitter:site" content="@robainaAlex" />
      {pageTitle && <title>{`${pageTitle} | Pets Love`}</title>}
      {description && <meta name={description} content={componentName} />}
      <meta property="og:image" content={image || defaultImage} />

      {/* The next tags have be implements */}
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
