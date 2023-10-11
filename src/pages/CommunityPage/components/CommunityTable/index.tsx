import {
  IconFacebook,
  IconInstagram,
  IconTelegram,
  IconWhatsapp,
} from '../../../../assets/icons'
import midDog from '../../../../assets/images/mid-dog.png'
import { BaseLoading } from '../../../../components/BaseLoading'
import { Pagination } from '../../../../components/Pagination'
import { BUCKET_AVATAR_USER } from '../../../../constants/buketsImage'
import { User } from '../../../SettingsPage/constants'

interface Data {
  users: User[]
  total: number
}

interface Props {
  data: Data
  skip: number
  take: number
  isLoading: boolean
  setSkip: (skip: number) => void
  goToUserProfile: (id: string) => void
}

export const CommunityTable: React.FC<Props> = ({
  data,
  skip,
  take,
  setSkip,
  isLoading,
  goToUserProfile,
}) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.onerror = null // Prevents infinite loop if local image is also not found
    target.src = midDog
  }

  const goToLink = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    link: string,
  ) => {
    e.stopPropagation()
    window.open(link, '_blank')
  }

  return (
    <>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-4"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Location
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
                  <tr
                    key={user.id}
                    onClick={() => goToUserProfile(user.id)}
                    className="hover:bg-primary-100 cursor-pointer "
                  >
                    <td
                      key={user.username}
                      className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-4"
                    >
                      <div className="flex items-center">
                        <div className="h-11 w-11 flex-shrink-0">
                          <img
                            alt="user"
                            src={`${BUCKET_AVATAR_USER}${user?.image}`}
                            className="h-11 w-11 rounded-full"
                            onError={handleError}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {user.username}
                          </div>
                          <p className="mt-1 text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {user?.location?.city && user?.location?.country ? (
                        <p>{`${user?.location?.city}, ${user?.location?.country}`}</p>
                      ) : (
                        <p className="text-gray-400">Location Unavailable</p>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {user.role}
                    </td>
                    <td>
                      <div className="px-3 py-5 flex gap-2  items-center h-full">
                        {user.socialMedia?.instagram && (
                          <button
                            className="cursor:pointer"
                            onClick={(
                              e: React.MouseEvent<
                                HTMLButtonElement,
                                MouseEvent
                              >,
                            ) =>
                              goToLink(
                                e,
                                `https://www.instagram.com/${user.socialMedia?.instagram}`,
                              )
                            }
                          >
                            <IconInstagram />
                          </button>
                        )}
                        {user.socialMedia?.facebook && (
                          <button
                            className="cursor:pointer"
                            onClick={(
                              e: React.MouseEvent<
                                HTMLButtonElement,
                                MouseEvent
                              >,
                            ) =>
                              goToLink(
                                e,
                                `https://www.facebook.com/${user.socialMedia?.facebook}`,
                              )
                            }
                          >
                            <IconFacebook />
                          </button>
                        )}
                        {user.socialMedia?.whatsapp && (
                          <button
                            onClick={(
                              e: React.MouseEvent<
                                HTMLButtonElement,
                                MouseEvent
                              >,
                            ) =>
                              goToLink(
                                e,
                                `https://wa.me/${user.socialMedia?.whatsapp}`,
                              )
                            }
                            className="cursor:pointer"
                          >
                            <IconWhatsapp />
                          </button>
                        )}
                        {user.socialMedia?.telegram && (
                          <button
                            className="cursor:pointer"
                            onClick={(e) =>
                              goToLink(
                                e,
                                `https://telegram.me/${user.socialMedia?.telegram}`,
                              )
                            }
                          >
                            <IconTelegram />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isLoading && (
              <div className="flex items-center  w-full justify-center p-8">
                <BaseLoading large />
              </div>
            )}
          </div>
        </div>
      </div>
      <Pagination
        skip={skip}
        take={take}
        setSkip={setSkip}
        total={data?.total}
      />
    </>
  )
}
