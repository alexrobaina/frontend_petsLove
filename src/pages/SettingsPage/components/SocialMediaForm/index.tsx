import { FC } from 'react'

import { BaseButton } from '../../../../components/BaseButton'
import { BaseInput } from '../../../../components/BaseInput'
import { ROLES } from '../../../../constants/community'

interface Props {
  user: {
    email: string
    username: string
    image: string
    role: string
    socialMedia: {
      facebook: string
      instagram: string
      whatsapp: string
    }
  }
}

export const SocialMediaForm: FC<Props> = ({ user }) => {
  return (
    <div className="divide-y mt-10 divide-white/5">
      <div className="flex pr-5 md:pr-12 gap-10">
        <div className="w-[50%]">
          <h2 className="text-base font-semibold leading-7 text-primary-950">
            Social Media{' '}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            The social media you want to share with the community, it's
            important to have a way to contact you.
          </p>
        </div>
        <form className="w-full">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-full">
            <div className="sm:col-span-3">
              <BaseInput label="Instagram" placeholder="@refigyPaw" />
            </div>

            <div className="sm:col-span-3">
              <BaseInput
                label="Facebook"
                placeholder="https://www.facebook.com/refigyPaw/"
              />
            </div>
            <div className="sm:col-span-3">
              <BaseInput label="Whatsapp" placeholder="Number phone" />
            </div>
          </div>
          <div className="mt-8 flex">
            <BaseButton text="Save" />
          </div>
        </form>
      </div>
    </div>
  )
}
