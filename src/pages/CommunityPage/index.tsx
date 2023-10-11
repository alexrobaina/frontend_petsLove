import { FC, useState } from 'react'

import {
  IconFacebook,
  IconInstagram,
  IconTelegram,
  IconWhatsapp,
} from '../../assets/icons'
import { BaseButtonGroups } from '../../components/BaseButtonGroups'
import GoogleAutocomplete from '../../components/GoogleAutocomplete'
import { Loader } from '../../components/Loader'
import { BUCKET_AVATAR_USER } from '../../constants/buketsImage'
import { ROLES, TYPE_OF_COMMUNITY } from '../../constants/community'
import useUserList from '../../hooks/useUserList'

interface User {
  id: string
  username: string
  email: string
  image: string
  role: string
  socialMedia: {
    facebook: string
    instagram: string
    telegram: string
    whatsapp: string
  }
}

export const CommunityPage: FC = () => {
  const [userRole, setUserRole] = useState(ROLES.SHELTER)
  const { data, error, isLoading } = useUserList({ role: userRole })

  if (error) {
    return <div>Error</div>
  }

  const handleChangeLocation = (result: {
    results: {
      formatted_address: string
      address_components: {
        long_name: string
        short_name: string
        types: string[]
      }[]
    }[]
    latLng: {
      lat: number
      lng: number
    }
  }) => {
    const data = {
      address: result.results[0].formatted_address,
      country: result.results[0].address_components[3].long_name,
      city: result.results[0].address_components[1].long_name,
    }

    console.log(data)
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-xl md:text-xl lg:text-3xl font-semibold">
          Community
        </h1>
      </div>
      <div className="shadow-lg rounded-md mt-16 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Find a professional
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Connect with trusted professionals—from vets to volunteers and
              shelters
            </p>
          </div>
          <div className="flex items-center gap-4 mt-10 md:mt-0 justify-center md:">
            <BaseButtonGroups
              buttonSelected={userRole}
              group={TYPE_OF_COMMUNITY}
              handleSelectButtonGroup={setUserRole}
            />
          </div>
        </div>
        <div className="mt-10">
          <GoogleAutocomplete
            label="Filter by location"
            setLocation={handleChangeLocation}
          />
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Name
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Contact
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data?.users.map((user: User) => (
                    <tr key={user.id}>
                      <td
                        key={user.username}
                        className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0"
                      >
                        <div className="flex items-center">
                          <div className="h-11 w-11 flex-shrink-0">
                            <img
                              alt="user"
                              src={`${BUCKET_AVATAR_USER}${user?.image}`}
                              className="h-11 w-11 rounded-full"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {user.username}
                            </div>
                            <div className="mt-1 text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Active
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {user.role}
                      </td>
                      <td>
                        <div className="px-3 py-5 flex gap-2  items-center h-full">
                          {user.socialMedia?.instagram && (
                            <a
                              target="_blank"
                              className="cursor:pointer"
                              href={`https://www.instagram.com/${user.socialMedia?.instagram}`}
                            >
                              <IconInstagram />
                            </a>
                          )}
                          {user.socialMedia?.facebook && (
                            <a
                              target="_blank"
                              className="cursor:pointer"
                              href={`https://www.facebook.com/${user.socialMedia?.facebook}`}
                            >
                              <IconFacebook />
                            </a>
                          )}
                          {user.socialMedia?.whatsapp && (
                            <a
                              target="_blank"
                              className="cursor:pointer"
                              href={`https://wa.me/${user.socialMedia?.whatsapp}`}
                            >
                              <IconWhatsapp />
                            </a>
                          )}
                          {user.socialMedia?.telegram && (
                            <a
                              target="_blank"
                              className="cursor:pointer"
                              href={`https://telegram.me/${user.socialMedia?.telegram}`}
                            >
                              <IconTelegram />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {isLoading && (
                <div className="flex items-center  w-full justify-center p-8">
                  <Loader big />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
