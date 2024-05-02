import type { FC } from 'react'

import { IconUser } from '../../../assets/icons/index'
import { MidDog } from '../../../assets/images'

interface Props {
  role?: string
  name?: string
  email?: string
  image?: string
  altText?: string
  className?: string
  description: string
}

export const ContactCard: FC<Props> = ({
  name,
  role,
  image,
  altText,
  description,
  className = '',
}) => {
  const pictureClass =
    'h-16 w-16 max-sm:h-[58px] max-sm:w-[58px] flex-shrink-0 rounded-full'

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.onerror = null // Prevents infinite loop if local image is also not found
    target.src = MidDog
  }

  return (
    <div
      className={`${className} shadow-lg col-span-1 divide-y divide-gray-200 rounded-lg bg-primary-50 ring-1 ring-primary-200`}
    >
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium text-gray-900 capitalize">
              {name}
            </h3>
            <span className="inline-flex flex-shrink-0 items-center rounded-full bg-primary-200 px-1.5 py-0.5 text-xs font-medium text-primary-950 ring-1 ring-inset ring-green-600/20">
              {role}
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-gray-500">{description}</p>
        </div>
        {image && (
          <img
            src={image}
            alt={altText || name}
            onError={handleError}
            className={`${pictureClass} h-10 w-10 object-cover flex-shrink-0 rounded-full bg-gray-300`}
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
    </div>
  )
}
