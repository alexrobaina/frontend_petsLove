import axios from 'axios'
import { FC, ChangeEvent, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { IconGoogle } from '../../../assets/icons'
import { BackgroundLogin } from '../../../assets/images'
import { BaseButton } from '../../../components/common/BaseButton'
import { BaseInput } from '../../../components/common/BaseInput'
import { BaseLoading } from '../../../components/common/BaseLoading'
export const LoginGoogle: FC = () => {
  const [successEmailLogin, setSuccessEmailLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const { t } = useTranslation(['common', 'login']);
  const [email, setEmail] = useState({
    value: '',
    error: false,
    helperText: '',
  });

  useEffect(() => {
    setSuccessEmailLogin(false);
    if (token) {
      setLoading(true);
      document.cookie = `token=${token}; path=/`;
      window.location.href = '/dashboard';
    }
    setTimeout(() => setLoading(false), 500);
  }, [token]);

  const signInWithGoogle = async () => {
    const { data } = await axios.get('/api/auth/google/')
    location.href = data?.location
  }

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail({
      value: emailValue,
      error: !isValidEmail(emailValue),
      helperText: isValidEmail(emailValue) ? '' : t('common:emailInvalid'),
    });
  };

  const loginEmailCallback = async () => {
    if (!isValidEmail(email.value)) {
      setEmail({ ...email, error: true, helperText: t('common:emailInvalid') });
      return;
    }
    try {
      setLoading(true);
      await axios.post('/api/auth/email/', {
        email: email.value,
        texts: {
          subject: t('login:subject'),
          hello: t('login:hello'),
          loginDescription: t('login:loginDescription'),
          login: t('login:login'),
          warning: t('login:warning'),
          thanks: t('login:thanks'),
          welcome: t('login:welcome'),
        },
      });
      setSuccessEmailLogin(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setEmail({
        ...email,
        error: true,
        helperText: t('login:emailError'),
      });
    }
  };

  const handleLoginEmail = () => {
    setEmail({ ...email, error: !isValidEmail(email.value) });
    if (isValidEmail(email.value)) {
      loginEmailCallback();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <BaseLoading large />
      </div>
    );
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
            {successEmailLogin ?
             <h2 className="mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-primary-900">
             {t('login:emailSent')}
           </h2> :
            <>
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
                      error={email.helperText}
                      label={t('common:email')}
                      handleChange={handleChangeEmail}
                      placeholder={t('login:addEmail')}
                    />
                  </div>
                  <div className="mt-6 w-full">
                    <BaseButton onClick={handleLoginEmail} wFull text={t('login:magicLink')} />
                  </div>
                </div>
              </div>
            </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
