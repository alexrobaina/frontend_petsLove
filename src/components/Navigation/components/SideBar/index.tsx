/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FC,
  ReactElement,
  MouseEvent,
  useContext,
  useState,
  useEffect,
} from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import {
  IconLogout,
  IconSearch,
  IconSettings,
  IconInventory,
  IconListDetails,
  IconChevronLeft,
  IconChevronRight,
  IconHomeInfinity,
  IconCalendarStats,
  IconBuildingStore,
} from '../../../../assets/icons'
import { MidDog } from '../../../../assets/images'
import i18n from '../../../../i18n'
import { AppContext } from '../../../../services/AppContext'
import { deleteCookie } from '../../../../utils/deleteCookie'
import { ButtonNavigate } from '../ButtonNavigate'

interface Props {
  children: ReactElement
  menuIsCollapsed: boolean
  setMenuIsCollapsed: (isCollapsed: boolean) => void
}

const TOP_NAVIGATION = [
  { to: '/dashboard', icon: <IconHomeInfinity />, text: 'dashboard' },
  { to: '/community', icon: <IconListDetails />, text: 'community' },
  {
    to: '/appointments',
    icon: <IconCalendarStats width={30} height={30} />,
    text: 'appointments',
  },
  { to: '/inventory', icon: <IconInventory />, text: 'inventory' },
  { to: '/expense', icon: <IconBuildingStore />, text: 'expense' },
  { to: '/searchPets', icon: <IconSearch />, text: 'searchPets' },
]

const BUTTON_NAVIGATION = [
  { to: '/settings', text: 'settings', icon: <IconSettings /> },
]

const Lng: any = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
}

export const SideBar: FC<Props> = ({
  children,
  menuIsCollapsed,
  setMenuIsCollapsed,
}) => {
  const [isOpenLngToggle, setIsOpenLngToggle] = useState(false)
  const { t } = useTranslation(['common'])
  const locale = i18n.language

  const [lng, setLng] = useState({
    lng: 'es',
    symbol: 'Español',
  })
  const navigation = useNavigate()
  const context = useContext(AppContext)

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.onerror = null // Prappointments infinite loop if local image is also not found
    target.src = MidDog
  }

  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    deleteCookie('token')
    navigation('/login')
    window.location.reload()
  }

  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpenLngToggle) {
        setIsOpenLngToggle(false)
      }
    }
    window.addEventListener('click', handleClickOutside)
    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [isOpenLngToggle])

  const handleOpenLngToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsOpenLngToggle(!isOpenLngToggle)
  }

  const handleChangeLng = (e: MouseEvent<HTMLButtonElement>, lng: string) => {
    e.stopPropagation()
    setLng({
      lng: Lng[lng],
      symbol: lng,
    })
    i18n.changeLanguage(lng)
    setIsOpenLngToggle(false)
  }

  const handleMenuIsCollapsed = () => {
    if (window.innerWidth < 638) {
      return setMenuIsCollapsed(true)
    }
    setMenuIsCollapsed(!menuIsCollapsed)
  }

  const isGoogleAvatar =
    context?.user?.image &&
    context?.user?.image.includes('googleusercontent' || 'ggpht')

  const showImage = isGoogleAvatar
    ? context?.user?.image
    : `${import.meta.env.VITE_BUCKET_NAME}users/avatar/${context?.user?.image}`

  useEffect(() => {
    setLng({
      lng: Lng[locale],
      symbol: locale,
    })
  }, [locale])

  const isSelected = (path: string) => {
    const pathname = window.location.pathname
    return pathname.includes(path)
  }

  return (
    <div className="flex relative z-2">
      {isOpenLngToggle && (
        <div
          className={`fixed w-[140px] h-[180px] rounded-lg p-2 bg-white shadow-2xl flex-col ${menuIsCollapsed ? 'right-3 top-[80px] sm:top-auto sm:bottom-2 sm:left-20' : 'right-3 top-[80px] sm:top-auto sm:bottom-2 left-60'}`}
        >
          <button
            className={`${lng.symbol === 'es' ? 'bg-primary-200' : ''} rounded-md p-3 mb-2 flex w-full justify-start px-4 items-center gap-3 hover:bg-primary-100`}
            onClick={(e) => handleChangeLng(e, 'es')}
          >
            <p className="flex justify-center items-center capitalize">ES</p>
            <p>Español</p>
          </button>
          <button
            className={`${lng.symbol === 'en' ? 'bg-primary-200' : ''}  rounded-md p-3 mb-2 flex w-full justify-start px-4 items-center gap-3 hover:bg-primary-100`}
            onClick={(e) => handleChangeLng(e, 'en')}
          >
            <p className="flex justify-center items-center capitalize">EN</p>
            <p>English</p>
          </button>
          <button
            className={`${lng.symbol === 'fr' ? 'bg-primary-200' : ''}  rounded-md p-3 flex w-full justify-start px-4 items-center gap-3 hover:bg-primary-100`}
            onClick={(e) => handleChangeLng(e, 'fr')}
          >
            <p className="flex justify-center items-center capitalize">FR</p>
            <p>French</p>
          </button>
        </div>
      )}
      <div className="overflow-x-auto sm:overflow-hidden z-20 fixed h-[67px] w-screen sm:w-auto sm:h-auto bottom-0 top-0 mt-2 mb-2 ml-2 sm:flex sm:flex-col bg-primary-300 rounded-md">
        <div
          className={`${menuIsCollapsed ? 'left-[28px]' : 'left-[100px]'} opacity-[50%] top-[48%] absolute z-50`}
        >
          <div
            onClick={handleMenuIsCollapsed}
            className="hidden ring-2 sm:flex cursor-pointer justify-center items-center ring-primary-800 h-4 w-4 rounded-full bg-primary-200 opacity-[900%]"
          >
            {menuIsCollapsed ? (
              <IconChevronRight width={20} />
            ) : (
              <IconChevronLeft width={20} />
            )}
          </div>
        </div>
        <div
          onClick={handleMenuIsCollapsed}
          className={`${menuIsCollapsed ? 'w-[67px]' : 'w-[218px]'} bg-primary-300 h-full cursor-pointer
           rounded-md flex sm:flex-col justify-between gap-10 sm:gap-0 items-center p-2`}
        >
          <div className="sm:w-full flex sm:flex-col gap-2">
            {TOP_NAVIGATION.map((item, index) => (
              <ButtonNavigate
                key={index}
                icon={item.icon}
                text={t(item.text)}
                isSelected={isSelected(item.text)}
                menuIsCollapsed={menuIsCollapsed}
                handleNavigation={(e: MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation()
                  navigation(item.to)
                }}
              />
            ))}
          </div>
          <div className="sm:w-full flex sm:flex-col gap-2 items-center">
            <button
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                navigation(`/user/${context?.user?.id}`)
              }}
              className="flex items-center justify-between gap-1 rounded-md hover:bg-primary-100 p-1"
            >
              <img
                alt="profile"
                onError={handleError}
                src={
                  showImage ||
                  'https://cdn.midjourney.com/362cb41d-fba2-4c78-b6a7-01cbbbc1fd72/0_1.png'
                }
                className="min-w-[42px] min-h-[42px] max-w-[42px] max-h-[42px] object-cover rounded-full"
              />
              {!menuIsCollapsed && (
                <div className="flex flex-col gap-0 truncate">
                  <p className="text-sm text-left">{context?.user?.username}</p>
                  <p className="text-xs text-ellipsis">
                    {context?.user?.email}
                  </p>
                </div>
              )}
            </button>
            {BUTTON_NAVIGATION.map((item, index) => (
              <ButtonNavigate
                key={index}
                icon={item.icon}
                text={t(`common:${item.text}`)}
                menuIsCollapsed={menuIsCollapsed}
                isSelected={isSelected(item.text)}
                handleNavigation={(e: MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation()
                  navigation(item.to)
                }}
              />
            ))}
            <div className="relative z-50 w-full">
              <button
                onClick={handleOpenLngToggle}
                className={`flex ${menuIsCollapsed ? 'justify-center' : 'gap-3 pl-3'} w-[48px] sm:w-full h-[48px] bg-primary-200 rounded-md items-center hover:bg-primary-100 uppercase`}
              >
                {lng.symbol}
                <p>
                  {!menuIsCollapsed && (
                    <p className="flex justify-center items-center capitalize">
                      {lng.lng}
                    </p>
                  )}
                </p>
              </button>
            </div>
            <button
              className={`flex justify-start gap-2 pl-3 pr-3 w-[48px] sm:w-full h-[48px] bg-primary-200 rounded-md items-center hover:bg-primary-100`}
              onClick={handleLogout}
            >
              <div className="flex justify-center">
                <IconLogout />
              </div>
              {!menuIsCollapsed && <p>{t('common:logout')}</p>}
            </button>
          </div>
        </div>
      </div>
      {/* Main Content Area */}
      <div
        className={`flex-1 ${
          menuIsCollapsed ? 'ml-[2px] sm:ml-[67px]' : 'ml-[218px]'
        } p-2 overflow-y-auto`}
      >
        {children}
      </div>
    </div>
  )
}
