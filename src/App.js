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
  EDIT_USER,
  SEARCH_VOLANTEERS,
  PETS_ADOPTER,
  MY_PETS,
  EDIT_PET,
  PROFILE_USER,
  RESET_PASSWORD,
} from 'routing/routes'
import RootStore from 'stores/RootStore'
import PageNotFound from 'components/commons/PageNotFound'
import UserContext from 'Context/UserContext'
import ForgotPassword from 'containers/ForgotPassword'
import ProfilePets from 'containers/ProfilePets'
import dotenv from 'dotenv'
import SearchVolunteers from 'containers/SearchVolunteers'
import PetsAdopted from 'containers/PetsAdopted'
import ForAdoption from 'containers/ForAdoption'
import Dashboard from 'containers/Dashboard'
import EditUser from 'containers/EditUser/EditUser'
import CreatePet from 'containers/CreatePet'
import Register from 'containers/Register'
import Login from 'containers/Login'
import Home from 'containers/Home'
import ProfileUser from 'containers/ProfileUser'
import EditPet from 'containers/EditPet'
import ResetPassword from 'containers/ResetPassword'
import Navbar from './components/commons/Navbar'
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
        <Navbar>
          <ScrollMemory />
          <Switch>
            <Route exact path={REGISTER} component={Register} />
            <Route exact path={RESET_PASSWORD} component={ResetPassword} />
            <Route exact path={LOGIN} component={Login} />
            <Route exact path={FORGOT_PASSWORD} component={ForgotPassword} />
            <Route exact path={HOME} component={Home} />
            <Route exact path={PROFILE_PET} component={ProfilePets} />
            <Route exact path={PROFILE_USER} component={ProfileUser} />
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
              component={EditPet}
            />
            <PrivateRoute
              exact
              isLogin={rootStore.authStore.isLogin}
              redirectPath={LOGIN}
              path={EDIT_USER}
              component={EditUser}
            />
            <PrivateRoute
              exact
              isLogin={rootStore.authStore.isLogin}
              redirectPath={LOGIN}
              path={SEARCH_VOLANTEERS}
              component={SearchVolunteers}
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
        </Navbar>
      </Router>
    </UserContext.Provider>
  )
}

export default observer(App)
