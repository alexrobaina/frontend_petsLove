import { FC } from 'react'
import { LoginGoogle } from './components/LoginGoogle'

export const LoginPage: FC = () => {
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col w-[300px] h-[500px] p-4 shadow-xl'>
        <div>
          <h1 className='text-xl text-primary-950'>Select a method to log in</h1>
        </div>
        <div className='mt-10'>
          <LoginGoogle />
        </div>
      </div>
    </div>
  )
}
