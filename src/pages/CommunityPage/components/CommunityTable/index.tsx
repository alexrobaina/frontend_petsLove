import { MidDog } from '../../../../assets/images'
import { BaseLoading } from '../../../../components/common/BaseLoading'
import { Pagination } from '../../../../components/common/Pagination'
import { SocialMediaContact } from '../../../../components/common/SocialMediaContact'
import { BUCKET_AVATAR_USER } from '../../../../constants/buketsImage'
import { User } from '../../../SettingsPage/constants'

interface Data {
  users: User[]
  total: number
}

interface Props {
  data: Data
  take: number
  page: number
  isLoading: boolean
  setPage: (page: number) => void
  goToUserProfile: (id: string) => void
}

export const CommunityTable: React.FC<Props> = ({
  data,
  take,
  page,
  setPage,
  isLoading,
  goToUserProfile,
}) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.onerror = null // Prevents infinite loop if local image is also not found
    target.src = MidDog
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
                            onError={handleError}
                            className="h-11 w-11 rounded-full"
                            src={`${BUCKET_AVATAR_USER}${user?.image}`}
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
                      <SocialMediaContact user={user} />
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
        take={take}
        page={page}
        setPage={setPage}
        total={data?.total}
      />
    </>
  )
}
