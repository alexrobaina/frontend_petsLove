import axios from 'axios'
import { observer } from 'mobx-react'
import { FC, useCallback, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Navigation from './components/Navigation/Navigation'
import { useModal } from './hooks/useModal'
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
  const { openModal } = useModal()
  const [role, setRole] = useState<string>(
    !props?.appContext?.user?.role ? '' : props?.appContext?.user?.role,
  )

  const setFieldValue = (_field: string, value: string) => {
    setRole(value)
  }

  const updateUserRole = useCallback(async () => {
    try {
      await axios.put(`/api/v1/user/role`, {
        id: props?.appContext?.user?.id,
        role,
      })
    } catch (err) {
      console.log(err)
    }
  }, [role, props?.appContext?.user?.id])

  // useEffect(() => {
  //   if (!props?.appContext?.user?.role) {
  //     openModal({
  //       canClose: false,
  //       title: 'Select your role',
  //       description: 'Select your role is required to continue',
  //       onSubmit: updateUserRole,
  //       isDisabled: role === '' ? true : false,
  //       children: (
  //         <div className="flex">
  //           <div className="mt-8 w-full">
  //             <BaseSelect
  //               name="role"
  //               value={role}
  //               setFieldValue={setFieldValue}
  //               options={[
  //                 { value: ROLES.ADOPTER, label: ROLES.ADOPTER },
  //                 { value: ROLES.SHELTER, label: ROLES.SHELTER },
  //                 { value: ROLES.VET, label: ROLES.VET },
  //                 { value: ROLES.VOLUNTEER, label: ROLES.VOLUNTEER },
  //               ]}
  //             />
  //           </div>
  //         </div>
  //       ),
  //     })
  //   }
  // }, [role])

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
