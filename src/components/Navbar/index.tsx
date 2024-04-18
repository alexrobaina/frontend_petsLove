import { FC } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { BaseButton } from '../common/BaseButton'

interface Props {}

export const Navbar: FC<Props> = () => {
  const navigate = useNavigate()

  return (
    <>
      <nav className="bg-primary-200 fixed top-0 left-0 w-full z-10">
        <div className="md:pl-20 md:pr-20">
          <div className="relative flex h-16 items-center justify-center">
            <div className="lg:block">
              <div className="flex gap-4 items-center">
                <BaseButton
                  style="secondary"
                  text="Adopt pets"
                  onClick={() => navigate('/adopt')}
                />
                <BaseButton
                  style="secondary"
                  text="Community"
                  onClick={() => navigate('/community')}
                />
                <div className="flex space-x-4">
                  <BaseButton
                    text="Login"
                    style="secondary"
                    onClick={() => navigate('/')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="p-5 md:ml-16 md:mr-16 pt-28">
        <Outlet />
      </div>
    </>
  )
}
