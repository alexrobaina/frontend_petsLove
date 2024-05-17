import { FC, MouseEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useNavigate } from 'react-router-dom'

import i18n from '../../i18n'
import { BaseButton } from '../common/BaseButton'

interface Props {}

export const Navbar: FC<Props> = () => {
  const [isOpenLngToggle, setIsOpenLngToggle] = useState(false)
  const [lng, setLng] = useState({
    lng: 'en',
    symbol: 'en',
  })
  const locale = i18n.language
  const { t } = useTranslation(['common'])
  const navigate = useNavigate()

  const handleOpenLngToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsOpenLngToggle(!isOpenLngToggle)
  }

  const handleChangeLng = (e: MouseEvent<HTMLButtonElement>, lng: string) => {
    e.stopPropagation()
    setLng({
      lng: lng,
      symbol: lng,
    })
    i18n.changeLanguage(lng)
    setIsOpenLngToggle(false)
  }

  useEffect(() => {
    if (locale === 'fr') {
      return setLng({
        lng: 'French',
        symbol: locale,
      })
    }
    setLng({
      lng: locale === 'en' ? 'English' : 'Español',
      symbol: locale,
    })
  }, [locale])

  return (
    <>
      <nav className="bg-primary-200 fixed md:px-0 px-1 top-0 left-0 w-full z-10">
        <div className="md:pl-20 md:pr-20">
          <div className="relative flex h-16 items-center justify-between md:justify-center">
            <div className="lg:block">
              <div className="flex gap-1 md:gap-4 items-center">
                <BaseButton
                  style="secondary"
                  text={t('common:adoptPet')}
                  onClick={() => navigate('/searchPets')}
                />
                <BaseButton
                  style="secondary"
                  text={t('common:community')}
                  onClick={() => navigate('/community')}
                />
                <div className="flex space-x-4">
                  <BaseButton
                    text={t('common:login')}
                    style="secondary"
                    onClick={() => navigate('/login')}
                  />
                </div>
              </div>
            </div>
            <div className="relative z-[999] md:left-4">
              <button
                onClick={handleOpenLngToggle}
                className={`flex justify-center w-full h-[34px] px-3 bg-primary-50 rounded-md items-center hover:bg-primary-100 uppercase`}
              >
                {lng.symbol}
              </button>
              {isOpenLngToggle && (
                <div
                  className={`absolute top-[60px] z-50 rounded-lg p-2 bg-white shadow-2xl gap-1 flex flex-col `}
                >
                  <button
                    className={`${lng.symbol === 'es' ? 'bg-primary-200' : ''} rounded-md p-3 flex w-full justify-start px-4 items-center gap-3 hover:bg-primary-100`}
                    onClick={(e) => handleChangeLng(e, 'es')}
                  >
                    <p className="flex justify-center items-center capitalize">
                      ES
                    </p>
                  </button>
                  <button
                    className={`${lng.symbol === 'en' ? 'bg-primary-200' : ''}  rounded-md p-3 flex w-full justify-start px-4 items-center gap-3 hover:bg-primary-100`}
                    onClick={(e) => handleChangeLng(e, 'en')}
                  >
                    <p className="flex justify-center items-center capitalize">
                      EN
                    </p>
                  </button>
                  <button
                    className={`${lng.symbol === 'fr' ? 'bg-primary-200' : ''}  rounded-md p-3 flex w-full justify-start px-4 items-center gap-3 hover:bg-primary-100`}
                    onClick={(e) => handleChangeLng(e, 'fr')}
                  >
                    <p className="flex justify-center items-center capitalize">
                      FR
                    </p>
                  </button>
                </div>
              )}
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
