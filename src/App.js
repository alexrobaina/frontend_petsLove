import React from 'react'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ScrollMemory from 'react-router-scroll-memory'
import PrivateRoute from 'routing/PrivateRoute'
import {
  LOGIN,
  REGISTER,
  EDIT_PET,
  DASHBOARD,
  EDIT_USER,
  CREATE_PET,
  SEARCH_PETS,
  PROFILE_PET,
  PROFILE_USER,
  LANDING_PAGE,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
  SEARCH_VOLANTEERS,
  SEARCH_PROTECTIONIST,
  ASKS,
} from 'routing/routes'
import RootStore from 'stores/RootStore'
import PageNotFound from 'components/commons/PageNotFound'
import UserContext from 'Context/UserContext'
import ForgotPassword from 'containers/ForgotPassword'
import ProfilePets from 'containers/ProfilePets'
import dotenv from 'dotenv'
import SearchVolunteers from 'containers/SearchVolunteers'
import Dashboard from 'containers/Dashboard'
import EditUser from 'containers/EditUser/EditUser'
import CreatePet from 'containers/CreatePet'
import Register from 'containers/Register'
import Login from 'containers/Login'
import Home from 'containers/Home'
import ProfileUser from 'containers/ProfileUser'
import EditPet from 'containers/EditPet'
import LandingPage from 'containers/LandingPage'
import ResetPassword from 'containers/ResetPassword'
import SearchProtectionist from 'containers/SearchProtectionist/SearchProtectionist'
import Asks from 'containers/Asks'
import Navbar from 'components/commons/Navbar'
import axiosInterceptors from './utils/axiosInterceptors'
import historyBrowser from './history'
import 'aos/dist/aos.css'
import './App.scss'

dotenv.config()
const rootStore = new RootStore()

axiosInterceptors(rootStore)

function App() {
  return (
    <UserContext.Provider value={rootStore}>
      <Router history={historyBrowser}>
        <ScrollMemory />
        <Navbar>
          <Switch>
            <Route exact path={REGISTER} component={Register} />
            <Route exact path={RESET_PASSWORD} component={ResetPassword} />
            <Route exact path={LOGIN} component={Login} />
            <Route exact path={FORGOT_PASSWORD} component={ForgotPassword} />
            <Route exact path={SEARCH_PETS} component={Home} />
            <Route exact path={LANDING_PAGE} component={LandingPage} />
            <Route exact path={`${PROFILE_PET}/:id`} component={ProfilePets} />
            <Route exact path={`${PROFILE_USER}/:id`} component={ProfileUser} />
            <Route exact path={ASKS} component={Asks} />
            <PrivateRoute
              exact
              path={DASHBOARD}
              redirectPath={LOGIN}
              component={Dashboard}
              isLogin={rootStore.authStore.isLogin}
            />
            <PrivateRoute
              exact
              path={CREATE_PET}
              redirectPath={LOGIN}
              component={CreatePet}
              isLogin={rootStore.authStore.isLogin}
            />
            <PrivateRoute
              exact
              component={EditPet}
              redirectPath={LOGIN}
              path={`${EDIT_PET}/:id`}
              isLogin={rootStore.authStore.isLogin}
            />
            <PrivateRoute
              exact
              redirectPath={LOGIN}
              component={EditUser}
              path={`${EDIT_USER}/:id`}
              isLogin={rootStore.authStore.isLogin}
            />
            <PrivateRoute
              exact
              redirectPath={LOGIN}
              path={SEARCH_VOLANTEERS}
              component={SearchVolunteers}
              isLogin={rootStore.authStore.isLogin}
            />
            <PrivateRoute
              exact
              redirectPath={LOGIN}
              path={SEARCH_PROTECTIONIST}
              component={SearchProtectionist}
              isLogin={rootStore.authStore.isLogin}
            />
            <Route component={PageNotFound} />
          </Switch>
        </Navbar>
      </Router>
    </UserContext.Provider>
  )
}

export default observer(App)
