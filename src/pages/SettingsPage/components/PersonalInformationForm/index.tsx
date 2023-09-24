import { FC } from 'react'

import { BaseButton } from '../../../../components/BaseButton'
import { BaseInput } from '../../../../components/BaseInput'
import { BaseSelect } from '../../../../components/BaseSelect'
import GoogleAutocomplete from '../../../../components/GoogleAutocomplete'
import { ROLES } from '../../../../constants/community'
import { CustomPlaceResult } from '../../../../constants/interfaces'

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
  const handleChangeLocation = (result: CustomPlaceResult) => {
    console.log({
      address: result.results[0].formatted_address,
      country: result.results[0].address_components[3].long_name,
      city: result.results[0].address_components[1].long_name,
    })
  }

  const options = [
    { value: ROLES.ADOPTER, label: ROLES.ADOPTER },
    { value: ROLES.SHELTER, label: ROLES.SHELTER },
    { value: ROLES.ADMIN, label: ROLES.ADMIN },
  ]

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
        <div className="w-full">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-full">
            <div className="col-span-full flex items-center gap-x-8">
              <img
                alt="user image"
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
            <div className="sm:col-span-3">
              <BaseInput
                label="Username"
                value={user.username}
                placeholder="janesmith"
              />
            </div>
            <div className="sm:col-span-3">
              <BaseSelect label="Role" options={options} />
            </div>
            <div className="col-span-full">
              <BaseInput
                isdisabled
                value={user.email}
                label="Email address"
                placeholder="Email address"
              />
            </div>
          </div>
          <div className="mt-8 flex">
            <BaseButton text="Save" />
          </div>
        </div>
      </div>
      <div className="flex pr-5 md:pr-12 gap-10 mt-14">
        <div className="w-[50%]">
          <h2 className="text-base font-semibold leading-7 text-primary-950">
            Location
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            If you are a shelter, please add your location. it is important to
            be able to locate you.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-full">
          <div className="col-span-full">
            <GoogleAutocomplete
              label="Location"
              placeholder="Add your location"
              setLocation={handleChangeLocation}
            />
          </div>
          <div className="mt-8 flex">
            <BaseButton text="Save" />
          </div>
        </div>
      </div>
    </div>
  )
}
