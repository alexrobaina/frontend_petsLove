import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './containers/Home'
import ViewPets from './containers/ViewPets'

import './App.scss'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/listPets" component={ViewPets}></Route>
        <Route path="/" component={Home}></Route>
      </Switch>
    </Router>
  )
}

export default App
