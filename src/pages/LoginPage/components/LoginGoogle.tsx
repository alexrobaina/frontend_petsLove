import axios from 'axios'
import { FC, ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { IconGoogle } from '../../../assets/icons'
import { BackgroundLogin } from '../../../assets/images'
import { BaseButton } from '../../../components/common/BaseButton'
import { BaseInput } from '../../../components/common/BaseInput'

export const LoginGoogle: FC = () => {
  const { t } = useTranslation(['common', 'login'])
  const [email, setEmail] = useState({
    value: '',
    error: false,
    helperText: '',
  })
  const signInWithGoogle = async () => {
    const { data } = await axios.get('/api/auth/google/')
    location.href = data?.location
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
      <img
        alt="background"
        src={BackgroundLogin}
        className="fixed top-0 left-0 h-full w-full bg-no-repeat bg-cover opacity-70 z-[-1]"
      />
      <div className="z-1 flex min-h-full flex-col justify-center py-8 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-primary-300 shadow-2xl sm:rounded-lg p-8 sm:px-12 w-[400px]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-primary-900">
                Pet's Love
              </h2>
            </div>
            <div className="space-y-6">
              <div>
                <button
                  onClick={signInWithGoogle}
                  className="bg-white shadow-md flex gap-2 px-4 py-1 justify-center items-center rounded-md w-full"
                >
                  <IconGoogle />
                  {t('login:google')}
                </button>
                <div className="relative flex justify-center mt-6 text-sm font-medium leading-6">
                  <span className="px-6 text-primary-900">
                    {t('login:or')}
                  </span>
                </div>
                <div className="mt-3">
                  <BaseInput
                    type="email"
                    value={email.value}
                    label={t('common:email')}
                    placeholder={t('login:addEmail')}
                    handleChange={handleChangeEmail}
                  />
                </div>
                <div className="mt-6 w-full">
                  <BaseButton wFull text={t('login:magicLink')} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
