import { FC } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { observer } from 'mobx-react'
import { ToastContainer } from 'react-toastify'
import { LoginPage } from './pages/LoginPage'
import { AppContext } from './services/AppContext'
import { ComponentsUiPage } from './pages/ComponentsUiPage'

interface Props {
  appContext: any
}

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
      <h1 className='text-primary-500 text-xl'>Vite + React + pets love</h1>
      <RouterProvider router={router} />
    </AppContext.Provider>
  )
})

export default App

const router = createBrowserRouter([
  {
    path: '/',
    element: <a href='/login'>login</a>,
    errorElement: <div>error</div>,
    children: [
      {
        index: true,
        element: <Navigate to='/dashboad' replace />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
    children: [
      {
        path: 'topo/',
        element: (
          <div className='w-full h-full bg-red-400 z-30'>
            <h1 className='text-black'>topo</h1>,
          </div>
        ),
      },
    ],
  },
  {
    path: '/saraza',
    element: <div>saraza</div>,
  },
  {
    path: '*',
    element: <div>redirect</div>,
  },
  {
    path: 'componentsUi',
    element: <ComponentsUiPage />,
  },
])
