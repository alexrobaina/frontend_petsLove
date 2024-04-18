import axios from 'axios'
import { observable } from 'mobx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import { Navbar } from './components/Navbar/index.tsx'
import { AdoptionPetPage } from './pages/AdoptionPetPage/index.tsx'
import { CommunityPage } from './pages/CommunityPage/index.tsx'
import { LoginPage } from './pages/LoginPage/index.tsx'
import { ProfilePetPage } from './pages/ProfilePetPage/index.tsx'
import { AppContextProps } from './services/AppContext.tsx'
import { getCookie } from './utils/getCookie.ts'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'

const queryClient = new QueryClient()

async function main() {
  let appContext: AppContextProps = observable({
    session: { token: '' },
    user: null,
  })

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      children: [
        {
          path: '/adopt',
          element: <AdoptionPetPage />,
        },
        {
          path: '/pet/:id',
          element: <ProfilePetPage />,
        },
        {
          path: '/community',
          element: <CommunityPage />,
        },
        {
          path: '/',
          element: <LoginPage />,
        },
        {
          path: '*',
          element: <LoginPage />,
        },
      ],
    },
  ])

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
      appContext = observable({
        session: { token: '' },
        user: null,
      })
      throw new Error('User not signed in')
    }
  } catch (_e) {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </React.StrictMode>,
    )
    return
  }

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
      <App appContext={appContext} />
    </QueryClientProvider>,
  )
}

void main()
