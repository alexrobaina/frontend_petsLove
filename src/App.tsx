import { FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { observer } from 'mobx-react'
import { ToastContainer } from 'react-toastify'
import { AppContext, AppContextProps } from './services/AppContext'
import { ComponentsUiPage } from './pages/ComponentsUiPage'
import Navigation from './components/Navigation/Navigation'
import { DashboardPage } from './pages/DashboardPage'
import { SearchPetsPage } from './pages/SearchPetsPage'

interface Props {
  appContext: AppContextProps
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigation />,
    children: [
      {
        path: 'topo/',
        element: (
          <div className='w-full h-full bg-red-400 z-30'>
            <h1 className='text-black'>topo</h1>,
          </div>
        ),
      },
      {
        path: '/userProfile',
        element: <div>User</div>,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/community',
        element: <div>community</div>,
      },
      {
        path: '/search',
        element: <SearchPetsPage />,
      },
      {
        path: '/settings',
        element: <div>settings</div>,
      },
      {
        path: 'ui',
        element: <ComponentsUiPage />,
      },
      {
        path: '*',
        element: <div>redirect</div>,
      },
    ],
  },
])

const App: FC<Props> = observer(props => {
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
        position='bottom-right'
      />
      <RouterProvider router={router} />
    </AppContext.Provider>
  )
})

export default App
