import { useState, FC } from 'react'
import { LoginGoogle } from './components/LoginGoogle'
// import { Outlet, useNavigate } from 'react-router-dom'

export const LoginPage: FC = () => {
  //   const navigate = useNavigate()
  const [view, setView] = useState<'login' | 'check your email'>('login')

  if (view === 'check your email') {
    return (
      <div className='flex justify-center'>
        <h1 className='text-primary-950 text-xl'>Check your email</h1>
      </div>
    )
  }

  //   const goToTopo = () => {
  //     navigate('/login/topo')
  //   }

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col w-[300px] h-[500px] p-4 shadow-xl'>
        <div>
          <h1 className='text-xl text-primary-950'>Select a method to log in</h1>
        </div>
        <div className='mt-10'>
          <LoginGoogle />
        </div>
        {/* <button onClick={goToTopo}>topo</button>
        <Outlet /> */}
      </div>
    </div>
  )
}
