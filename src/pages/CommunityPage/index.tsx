import { FC, useState } from 'react'

import { IconFacebook, IconInstagram, IconWhatsapp } from '../../assets/icons'
import { BaseButtonGroups } from '../../components/BaseButtonGroups'
import GoogleAutocomplete from '../../components/GoogleAutocomplete'
import { Header } from '../../components/Header'
import { Loader } from '../../components/Loader'
import { ROLES, TYPE_OF_COMMUNITY } from '../../constants/community'
import { CustomPlaceResult } from '../../constants/interfaces'
import useUserList from '../../hooks/useUserList'

interface User {
  username: string
  email: string
  image: string
  role: string
  socialMedia: {
    facebook: string
    instagram: string
    whatsapp: string
  }
}

export const CommunityPage: FC = () => {
  const [userRole, setUserRole] = useState(ROLES.SHELTER)
  const { data, error, isLoading } = useUserList({ role: userRole })

  if (error) {
    return <div>Error</div>
  }

  const handleChangeLocation = (result: CustomPlaceResult) => {
    const data = {
      address: result.results[0].formatted_address,
      country: result.results[0].address_components[3].long_name,
      city: result.results[0].address_components[1].long_name,
    }

    console.log(data)
  }

  return (
    <>
      <header className="flex justify-between">
        <Header title="Community" />
      </header>
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
                  <tr>
                    {data?.users.map((user: User) => (
                      <>
                        <td
                          key={user.username}
                          className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0"
                        >
                          <div className="flex items-center">
                            <div className="h-11 w-11 flex-shrink-0">
                              <img
                                className="h-11 w-11 rounded-full"
                                src={user.image}
                                alt=""
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
                            <a className="cursor:pointer" href="">
                              <IconInstagram />
                            </a>
                            <a className="cursor:pointer" href="">
                              <IconFacebook />
                            </a>
                            <a className="cursor:pointer" href="">
                              <IconWhatsapp />
                            </a>
                          </div>
                          {user.socialMedia?.facebook}
                        </td>
                      </>
                    ))}
                  </tr>
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
