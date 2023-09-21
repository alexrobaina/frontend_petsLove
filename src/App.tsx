import { observer } from 'mobx-react'
import { FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Navigation from './components/Navigation/Navigation'
import { AdoptionPetPage } from './pages/AdoptionPetPage'
import { CommunityPage } from './pages/CommunityPage'
import { ComponentsUiPage } from './pages/ComponentsUiPage'
import { DashboardPage } from './pages/DashboardPage'
import { ProfilePetPage } from './pages/ProfilePetPage'
import { SettingsPage } from './pages/SettingsPage'
import { UserProfilePage } from './pages/UserProfilePage'
import { AppContext, AppContextProps } from './services/AppContext'

interface Props {
  appContext: AppContextProps
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigation />,
    children: [
      {
        path: '/user/:id',
        element: <UserProfilePage />,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
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
        path: '/settings',
        element: <SettingsPage />,
      },
      {
        path: 'ui',
        element: <ComponentsUiPage />,
      },
      {
        path: '/search',
        element: <AdoptionPetPage />,
      },
      {
        path: '*',
        element: <div>redirect</div>,
      },
    ],
  },
])

const App: FC<Props> = observer((props) => {
  return (
    <AppContext.Provider value={props.appContext}>
      <ToastContainer
        draggable
        rtl={false}
        pauseOnHover
        hideProgressBar
        autoClose={5000}
        pauseOnFocusLoss
        closeButton={false}
        newestOnTop={false}
        position="bottom-right"
      />
      <RouterProvider router={router} />
    </AppContext.Provider>
  )
})

export default App
