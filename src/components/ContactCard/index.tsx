import type { FC } from 'react'

import { IconUser } from '../../assets/icons/index'

interface Props {
  name: string
  description: string
  image?: string
  altText?: string
  status: 'Admin' | 'Regular User'
}

export const ContactCard: FC<Props> = ({
  name,
  description,
  status,
  image,
  altText,
}) => {
  const pictureClass =
    'h-16 w-16 max-sm:h-[58px] max-sm:w-[58px] flex-shrink-0 rounded-full'

  return (
    <div className="flex w-full items-center justify-between space-x-6 p-6 border rounded-md">
      <div className="flex-1 truncate">
        <h3 className="truncate text-md font-medium text-gray-900 inline max-sm:text-sm">
          {name}
        </h3>
        <span className="inline-flex flex-shrink-0 items-center justify-center rounded-full bg-green-50 px-2 py-1 ml-2.5 text-sm max-md:text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
          {status}
        </span>
        <p className="mt-1 truncate text-md text-gray-500 max-sm:text-sm">
          {description}
        </p>
      </div>
      {image && (
        <img
          className={`${pictureClass} bg-gray-300`}
          src={image}
          alt={altText || `${name}'s Profile Picture`}
        />
      )}
      {!image && (
        <div
          className={`${pictureClass} flex items-center justify-center bg-slate-200`}
        >
          <IconUser />
        </div>
      )}
    </div>
  )
}
