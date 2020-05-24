import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'utils/i18n'
import 'leaflet/dist/leaflet.css'
import Loading from './components/commons/Loading'
import './index.scss'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Suspense fallback={<Loading loadingRing />}>
    <App />
  </Suspense>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
