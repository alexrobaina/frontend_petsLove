import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { configure, observable } from 'mobx'
import './index.css'
import { LoginPage } from './pages/LoginPage'
import { AppContextProps } from './services/AppContext.ts'
import axios from 'axios'
import { getCookie } from './utils/getCookie.ts'

async function main () {
  if (import.meta.env.DEV) {
    configure({ enforceActions: 'observed' })
  }

  // Check if user is signed in
  let appContext: AppContextProps = observable({
    session: { token: '' },
    user: null,
  })
  try {
    const token = getCookie('token')

    if (token) {
      const { data } = await axios.get('/api/auth/login/', {
        withCredentials: true,
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      appContext = observable({
        session: { token: token },
        user: data.user,
      })
    } else {
      throw new Error('User not signed in')
    }
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
