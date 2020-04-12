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
  USER_TRANSIT,
  PETS_ADOPTER,
  MY_PETS, EDIT_PET,
} from 'routing/routes'
import RootStore from 'stores/RootStore'
import PageNotFound from 'components/commons/PageNotFound'
import UserContext from 'Context/UserContext'
import ForgotPassword from 'containers/ForgotPassword'
import ProfilePets from 'containers/ProfilePets'
import ProfileUser from 'containers/ProfileUser'
import TransitUser from 'containers/TransitUser'
import PetsAdopted from 'containers/PetsAdopted'
import ForAdoption from 'containers/ForAdoption'
import Dashboard from 'containers/Dashboard'
import CreatePet from 'containers/CreatePet'
import Register from 'containers/Register'
import Login from 'containers/Login'
import Home from 'containers/Home'
import historyBrowser from './history'
import 'aos/dist/aos.css'
import './App.scss'

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
            path={EDIT_PET}
            component={CreatePet}
          />
          <PrivateRoute
            exact
            isLogin={rootStore.authStore.isLogin}
            redirectPath={LOGIN}
            path={USER_PROFILE}
            component={ProfileUser}
          />
          <PrivateRoute
            exact
            isLogin={rootStore.authStore.isLogin}
            redirectPath={LOGIN}
            path={USER_TRANSIT}
            component={TransitUser}
          />
          <PrivateRoute
            exact
            isLogin={rootStore.authStore.isLogin}
            redirectPath={LOGIN}
            path={PETS_ADOPTER}
            component={PetsAdopted}
          />
          <PrivateRoute
            exact
            isLogin={rootStore.authStore.isLogin}
            redirectPath={LOGIN}
            path={MY_PETS}
            component={ForAdoption}
          />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </UserContext.Provider>
  )
}

export default observer(App)
