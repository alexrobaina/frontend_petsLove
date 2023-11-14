import { FC, ReactNode, isValidElement } from 'react'

type Props = {
  icon: ReactNode
  url: string
  text: string
}

export const LinkedIconText: FC<Props> = ({ icon, url, text }) => {
  return (
    <div className="flex flex-row gap-1 items-center content-center">
      {isValidElement(icon) && (
        <span className={'w-4 h-[14.44px]'}>{icon}</span>
      )}
      <a
        className="text-[15.28px] underline underline-offset-[3px]"
        href={url}
        target="_blank"
      >
        {text}
      </a>
    </div>
  )
}
