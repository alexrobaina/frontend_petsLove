import axios from 'axios'
import { FC, ChangeEvent, useState } from 'react'

import { IconGoogle } from '../../../assets/icons'
import { BaseButton } from '../../../components/BaseButton'
import { BaseInput } from '../../../components/BaseInput'

export const LoginGoogle: FC = () => {
  const [email, setEmail] = useState({
    value: '',
    error: false,
    helperText: '',
  })
  const signInWithGoogle = async () => {
    const { data } = await axios.get('/api/auth/google/')
    location.href = data.location
  }

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail({
      error: false,
      helperText: '',
      value: e.target.value,
    })
  }

  return (
    <div className="flex justify-center">
      <div className="flex min-h-full flex-col justify-center py-8 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-primary-50 shadow sm:rounded-lg p-8 sm:px-12 w-[400px]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Pet's Love
              </h2>
            </div>
            <form className="space-y-6" action="#" method="POST">
              <div>
                <button
                  onClick={signInWithGoogle}
                  className="bg-white shadow-md flex gap-2 px-4 py-1 justify-center items-center rounded-md w-full"
                >
                  <IconGoogle />
                  Sign in with Google
                </button>
                <div className="relative flex justify-center mt-6 text-sm font-medium leading-6">
                  <span className="bg-primary-50 px-6 text-gray-900">
                    Or continue with
                  </span>
                </div>
                <div className="mt-3">
                  <BaseInput
                    type="email"
                    value={email.value}
                    label="Email address"
                    placeholder="Add your email"
                    handleChange={handleChangeEmail}
                  />
                </div>
                <div className="mt-6">
                  <BaseButton wFull type="primary" text="Magic link" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
