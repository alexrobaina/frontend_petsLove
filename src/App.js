import React from 'react'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ScrollMemory from 'react-router-scroll-memory'
import PrivateRoute from 'routing/PrivateRoute'
import {
  FORGOT_PASSWORD,
  LOGIN,
  HOME,
  REGISTER,
  CREATE_PET,
  PROFILE_PET,
  USER_PROFILE,
} from 'routing/routes'
import Login from 'containers/Login'
import Register from 'containers/Register'
import RootStore from 'stores/RootStore'
import Home from 'containers/Home'
import ForgotPassword from 'containers/ForgotPassword'
import Dashboard from 'containers/Dashboard'
import UserContext from 'Context/UserContext'
import PageNotFound from 'components/commons/PageNotFound'
import historyBrowser from './history'
import 'aos/dist/aos.css'
import './App.scss'
import CreatePet from './containers/CreatePet'
import ProfilePets from './containers/ProfilePets/ProfilePets'
import ProfileUser from './containers/ProfileUser'

const rootStore = new RootStore()

function App() {
  return (
    <UserContext.Provider value={rootStore}>
      <Router history={historyBrowser}>
        <ScrollMemory />
        <Switch>
          <Route exact path={REGISTER} component={Register} />
          <Route exact path={LOGIN} component={Login} />
          <Route exact path={FORGOT_PASSWORD} component={ForgotPassword} />
          <Route exact path={HOME} component={Home} />
          <Route exact path={PROFILE_PET} component={ProfilePets} />
          <PrivateRoute
            exact
            isLogin={rootStore.authStore.isLogin}
            redirectPath={LOGIN}
            path="/dashboard"
            component={Dashboard}
          />
          <PrivateRoute
            exact
            isLogin={rootStore.authStore.isLogin}
            redirectPath={LOGIN}
            path={CREATE_PET}
            component={CreatePet}
          />
          <PrivateRoute
            exact
            isLogin={rootStore.authStore.isLogin}
            redirectPath={LOGIN}
            path={USER_PROFILE}
            component={ProfileUser}
          />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </UserContext.Provider>
  )
}

export default observer(App)
