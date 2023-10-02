import { FC } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { BaseButton } from '../BaseButton'

interface Props {}

export const Navbar: FC<Props> = () => {
  const navigate = useNavigate()

  return (
    <>
      <nav className="bg-primary-200 fixed top-0 left-0 w-full z-10">
        <div className="md:pl-20 md:pr-20">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex items-center px-2 lg:px-0">
            </div>
            <div className="lg:ml-4 lg:block px-2">
              <div className="flex gap-4 items-center">
                  <BaseButton
                    style="primary"
                    text="Adopt pets"
                    onClick={() => navigate('/adopt')}
                  />
                <div className="flex space-x-4">
                </div>
                <div className="flex  space-x-4">
                  <BaseButton
                    text="Login"
                    style="primary"
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
