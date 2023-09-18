import { FC, ReactNode, MouseEvent } from 'react'

interface Props {
  icon: ReactNode
  text: string
  menuIsCollapsed: boolean
  handleNavigation: (e: MouseEvent<HTMLButtonElement>) => void
}

export const ButtonNavigate: FC<Props> = ({
  icon,
  text,
  handleNavigation,
  menuIsCollapsed,
}) => {
  return (
    <button
      onClick={handleNavigation}
      className={`flex ${
        menuIsCollapsed ? 'justify-center' : 'justify-start'
      } gap-4 p-2 w-full h-[48px] bg-primary-200 rounded-md items-center hover:bg-primary-100`}
    >
      {icon}
      {!menuIsCollapsed && <p>{text}</p>}
    </button>
  )
}
