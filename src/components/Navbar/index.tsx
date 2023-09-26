import { FC, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { BaseButton } from '../BaseButton'

interface Props {}

export const Navbar: FC<Props> = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const navigate = useNavigate()

  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  return (
    <>
      <nav className="bg-primary-200 fixed top-0 left-0 w-full z-10">
        <div className="md:pl-20 md:pr-20">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex items-center px-2 lg:px-0">
              <div className="flex-shrink-0 text-primary-950">Pet's Love</div>
              <div className="hidden lg:ml-6 lg:block">
                <div className="flex space-x-4">
                  <BaseButton
                    onClick={() => navigate('/adopt')}
                    type="secondary"
                    text="Adopt pets"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end"></div>
            <div className="flex lg:hidden">
              <button
                type="button"
                aria-expanded="false"
                onClick={handleOpenMenu}
                aria-controls="mobile-menu"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"

                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="hidden lg:ml-4 lg:block">
              <div className="flex items-center">
                <div className="flex space-x-4">
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
        <div className="lg:hidden h-screen" id="mobile-menu">
          <div className="h-full px-20 pb-3 pt-2">
            <div className="flex flex-col space-x-4">
              <BaseButton
                wFull
                style="secondary"
                text="Adopt pets"
                onClick={() => navigate('/adopt')}
              />
            </div>
            <div className="flex flex-col mt-10">
              <BaseButton wFull style="primary" text="Login" />
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
