import React from 'react'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import * as Routes from 'routing/routes'
import LayoutContainer from 'components/commons/LayoutContainer'
import Dashboard from 'containers/Dashboard'
import ProfilePets from 'containers/ProfilePets'
import Home from 'containers/Home'

const AuthorizedRouter = () => {
  return (
    <LayoutContainer>
      <a href="/dashboard">Dashboard</a>
      <Router>
        <Switch>
          <Route exact path={Routes.HOME} component={Home} />
          <Route exact path={Routes.PET_PROFILE} component={ProfilePets} />
          <Route path={Routes.DASHBOARD} component={Dashboard} />
        </Switch>
      </Router>
    </LayoutContainer>
  )
}

export default observer(AuthorizedRouter)
