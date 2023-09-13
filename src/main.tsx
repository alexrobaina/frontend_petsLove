import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { configure, observable } from 'mobx'
import './index.css'
import { LoginPage } from './pages/LoginPage'
import { AppContextProps } from './services/AppContext.ts'
import axios from 'axios'

async function main () {
  if (import.meta.env.DEV) {
    configure({ enforceActions: 'observed' })
  }

  // Check if user is signed in
  let appContext: AppContextProps
  try {
    // const sessions = await axios.get('/api/auth/sessions', {
    //   withCredentials: true,
    //   timeout: 5000,
    // })
    // if (
    //   !Array.isArray(sessions.data?.resources) ||
    //   sessions.data.resources.length !== 1
    // ) {
    //   throw new Error('Invalid response')
    // }
    appContext = observable({
      session: { token: 'sessions.data.resources[0].token' },
      user: 'sessions.data.resources[0].user',
    })
  } catch (_e) {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <LoginPage />
      </React.StrictMode>,
    )
    return
  }

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <App appContext={appContext} />,
  )
}

void main()
