import { FC, ReactElement, MouseEvent, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  IconHomeInfinity,
  IconListDetails,
  IconLogout,
  IconSearch,
  IconSettings,
} from '../../../../assets/icons'
import { MidDog } from '../../../../assets/images'
import { BUCKET_AVATAR_USER } from '../../../../constants/buketsImage'
import { AppContext } from '../../../../services/AppContext'
import { deleteCookie } from '../../../../utils/deleteCookie'
import { ButtonNavigate } from '../ButtonNavigate'

interface Props {
  children: ReactElement
  menuIsCollapsed: boolean
  setMenuIsCollapsed: (isCollapsed: boolean) => void
}

export const SideBar: FC<Props> = ({
  children,
  menuIsCollapsed,
  setMenuIsCollapsed,
}) => {
  const navigation = useNavigate()
  const context = useContext(AppContext)

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.onerror = null // Prevents infinite loop if local image is also not found
    target.src = MidDog
  }

  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    deleteCookie('token')
    navigation('/')
    window.location.reload()
  }

  const handleMenuIsCollapsed = () => {
    setMenuIsCollapsed(!menuIsCollapsed)
  }

  const TOP_NAVIGATION = [
    { to: '/dashboard', icon: <IconHomeInfinity />, text: 'Dashboard' },
    { to: '/community', icon: <IconListDetails />, text: 'Community' },
    { to: '/search', icon: <IconSearch />, text: 'Search' },
  ]

  const BOTTOM_NAVIGATION = [
    { to: '/settings', text: 'Settings', icon: <IconSettings /> },
  ]

  const isGoogleAvatar =
    context?.user?.image &&
    context?.user?.image.includes('googleusercontent' || 'ggpht')

  const showImage = isGoogleAvatar
    ? context?.user?.image
    : `${BUCKET_AVATAR_USER}${context?.user?.image}`

  return (
    <div className="flex relative overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="fixed h-auto bottom-0 top-0 mt-2 mb-2 ml-2 flex flex-col bg-primary-300 rounded-md">
        <div
          onClick={handleMenuIsCollapsed}
          className={`${
            menuIsCollapsed ? 'min-w-[67px]' : 'min-w-[218px]'
          }  bg-primary-300 h-full cursor-pointer
           rounded-md flex flex-col justify-between items-center p-2`}
        >
          <div className="w-full flex flex-col gap-2">
            {TOP_NAVIGATION.map((item, index) => (
              <ButtonNavigate
                key={index}
                icon={item.icon}
                text={item.text}
                menuIsCollapsed={menuIsCollapsed}
                handleNavigation={(e: MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation()
                  navigation(item.to)
                }}
              />
            ))}
          </div>
          <div className="w-full flex flex-col gap-2">
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
                className="w-[42px] h-[42px] rounded-full"
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
            {BOTTOM_NAVIGATION.map((item, index) => (
              <ButtonNavigate
                key={index}
                text={item.text}
                icon={item.icon}
                menuIsCollapsed={menuIsCollapsed}
                handleNavigation={(e: MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation()
                  navigation(item.to)
                }}
              />
            ))}
            <button
              onClick={handleLogout}
              className={`${
                menuIsCollapsed ? 'justify-center' : 'justify-start'
              } flex justify-start gap-4 p-2 w-full h-[48px] bg-primary-200 rounded-md items-center hover:bg-primary-100`}
            >
              <IconLogout />
              {!menuIsCollapsed && <p>Logout</p>}
            </button>
          </div>
        </div>
      </div>
      {/* Main Content Area */}
      <div
        className={`flex-1 ${
          menuIsCollapsed ? 'ml-[67px]' : 'ml-[218px]'
        } p-2 overflow-y-auto`}
      >
        {children}
      </div>
    </div>
  )
}
