import React, { FC } from 'react'

import {
  IconFacebook,
  IconInstagram,
  IconTelegram,
  IconWhatsapp,
} from '../../../assets/icons'

// Assuming these are the icons components you're using

interface User {
  user: {
    socialMedia: {
      instagram?: string
      telegram?: string
      facebook?: string
      whatsapp?: string
    }
  }
}

export const SocialMediaContact: FC<User> = ({ user }) => {
  const goToLink = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    link: string,
  ) => {
    e.stopPropagation()
    window.open(link, '_blank')
  }

  return (
    <div className="flex gap-2 items-center h-full">
      {user?.socialMedia?.instagram && (
        <button
          className="cursor:pointer"
          onClick={(e) =>
            goToLink(
              e,
              `https://www.instagram.com/${user.socialMedia.instagram}`,
            )
          }
        >
          <IconInstagram />
        </button>
      )}
      {user?.socialMedia?.facebook && (
        <button
          className="cursor:pointer"
          onClick={(e) =>
            goToLink(e, `https://www.facebook.com/${user.socialMedia.facebook}`)
          }
        >
          <IconFacebook />
        </button>
      )}
      {user?.socialMedia?.whatsapp && (
        <button
          className="cursor:pointer"
          onClick={(e) =>
            goToLink(e, `https://wa.me/${user.socialMedia.whatsapp}`)
          }
        >
          <IconWhatsapp />
        </button>
      )}
      {user?.socialMedia?.telegram && (
        <button
          className="cursor:pointer"
          onClick={(e) =>
            goToLink(e, `https://telegram.me/${user.socialMedia.telegram}`)
          }
        >
          <IconTelegram />
        </button>
      )}
    </div>
  )
}
