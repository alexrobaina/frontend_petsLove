import { observer } from 'mobx-react'
import { FC, useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Navigation from './components/Navigation'
import { UserRoleSelectorModal } from './components/UserRoleSelectorModal'
import { AdoptionPetPage } from './pages/AdoptionPetPage'
import { CommunityPage } from './pages/CommunityPage'
import { ComponentsUiPage } from './pages/ComponentsUiPage'
import { DashboardPage } from './pages/DashboardPage'
import { ProfilePetPage } from './pages/ProfilePetPage'
import { SettingsPage } from './pages/SettingsPage'
import { UserProfilePage } from './pages/UserProfilePage'
import { AppContext, AppContextProps } from './services/AppContext'

import './api/axiosInstance'

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
        element: <DashboardPage />,
      },
    ],
  },
])

const App: FC<Props> = observer((props) => {
  const [isOpenRoleModal, setOpenRoleModal] = useState<boolean>(false)

  useEffect(() => {
    if (
      !props?.appContext?.user?.role &&
      props?.appContext?.session?.token !== ''
    ) {
      setOpenRoleModal(true)
    }
  }, [props?.appContext?.user?.role])

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
      <UserRoleSelectorModal
        user={{
          id: props?.appContext?.user?.id || '',
          role: props?.appContext?.user?.role || '',
          username: props?.appContext?.user?.username || '',
          location: {
            address: props?.appContext?.user?.address || '',
          },
        }}      
        isOpenRoleModal={isOpenRoleModal}
        setOpenRoleModal={setOpenRoleModal}
      />
    </AppContext.Provider>
  )
})

export default App
