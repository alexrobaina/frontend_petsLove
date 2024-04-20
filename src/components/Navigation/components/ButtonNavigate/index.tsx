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
      className={`flex justify-start gap-2 p-2 pl-[10px] w-full h-[48px] bg-primary-200 rounded-md items-center hover:bg-primary-100`}
    >
      <div className='flex justify-center w-[30px]'>
        {icon}
      </div>
      {!menuIsCollapsed && <p>{text}</p>}
    </button>
  )
}
