import { FC } from 'react'

import { BaseButton } from '../../../../components/BaseButton'
import { BaseInput } from '../../../../components/BaseInput'
import GoogleAutocomplete from '../../../../components/GoogleAutocomplete'
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

export const PersonalInformationForm: FC<Props> = ({ user }) => {
  return (
    <div className="divide-y mt-20 divide-white/5">
      <div className="flex pr-5 md:pr-12 gap-10">
        <div className="w-[50%]">
          <h2 className="text-base font-semibold leading-7 text-primary-950">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            Use a permanent address where you can receive mail.
          </p>
        </div>
        <form className="w-full">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-full">
            <div className="col-span-full flex items-center gap-x-8">
              <img
                alt=""
                src={user?.image}
                className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
              />
              <div>
                <BaseButton type="secondary" text="Upload a different photo" />
                <p className="mt-2 text-xs leading-5 text-gray-400">
                  JPG, GIF or PNG. 1MB max.
                </p>
              </div>
            </div>
            <div className="sm:col-span-3">
              <BaseInput label="First name" placeholder="First name" />
            </div>

            <div className="sm:col-span-3">
              <BaseInput label="Last name" placeholder="Last name" />
            </div>

            <div className="col-span-full">
              <BaseInput label="Email address" placeholder="Email address" />
            </div>

            <div className="sm:col-span-3">
              <BaseInput label="Username" placeholder="janesmith" />
            </div>

            <div className="col-span-full">
              <GoogleAutocomplete
                label="Location"
                placeholder="Add your location"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-primary-950">
                Role
              </label>
              <div className="mt-1">
                <select
                  id="timezone"
                  name="timezone"
                  className="block w-full rounded-md h-[36px] border-0 py-1.5 text-primary-950 shadow-sm ring-1 ring-inset ring-primary-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6 [&_*]:text-black"
                >
                  <option>{ROLES.ADOPTER}</option>
                  <option>{ROLES.SHELTER}</option>
                  <option>{ROLES.VET}</option>
                  <option>{ROLES.VOLUNTEER}</option>
                </select>
              </div>
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
