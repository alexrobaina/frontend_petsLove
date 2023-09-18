import { FC } from 'react'
import { IconGoogle } from '../../../assets/icons'
import axios from 'axios'

export const LoginGoogle: FC = () => {
  const signInWithGoogle = async () => {
    const { data } = await axios.get('/api/auth/google/')
    location.href = data.location
  }

  return (
    <div className='flex flex-col'>
      <button
        onClick={signInWithGoogle}
        className='bg-white shadow-md flex gap-2 px-4 py-1 justify-center items-center rounded-md w-full'
      >
        <IconGoogle />
        Sign in with Google
      </button>
    </div>
  )
}
