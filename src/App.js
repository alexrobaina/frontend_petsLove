import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProfilePets from 'containers/ProfilePets'
import Login from 'containers/Login'
import Home from 'containers/Home'
import Register from 'containers/Register'
import ForgotPassword from 'containers/ForgotPassword'
import './App.scss'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/profile-pets/:id" component={ProfilePets} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  )
}

export default App
