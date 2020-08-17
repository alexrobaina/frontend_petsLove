import React from 'react'
import { useLocation } from 'react-router'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isLogin, redirectPath, ...rest }) => {
  const location = useLocation()

  if (isLogin) {
    return <Route {...rest} render={props => <Component {...props} />} />
  }

  return (
    <Redirect
      to={{
        pathname: redirectPath,
        state: { from: location },
      }}
    />
  )
}

PrivateRoute.propTypes = {
  redirectPath: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
}

export default observer(PrivateRoute)
