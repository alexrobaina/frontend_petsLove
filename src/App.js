import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from 'containers/Login'
import Home from 'containers/Home'

import './App.scss'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/" component={Home}></Route>
      </Switch>
    </Router>
  )
}

export default App
