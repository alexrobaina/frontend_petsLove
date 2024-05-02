import { useTranslation } from 'react-i18next'

import { BaseLoading } from '../../../../components/common/BaseLoading'
import { Pagination } from '../../../../components/common/Pagination'
import { SocialMediaContact } from '../../../../components/common/SocialMediaContact'
import { getUserImage, handleError } from '../../../../utils/images'
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
  const { t } = useTranslation(['common'])

  return (
    <>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-950 sm:pl-2 bg-primary-100 rounded-tl-xl"
                  >
                    {t('common:name')}
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold bg-primary-100 text-gray-900"
                  >
                    {t('common:location')}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold bg-primary-100 text-gray-900"
                  >
                    {t('common:role')}
                  </th>
                  <th
                      scope="col"
                      className="px-8 py-3.5 text-right bg-primary-100 text-sm font-semibold text-primary-950 rounded-tr-xl"
                      >
                      {t('common:contact')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white rounded-3xl">
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
                            src={getUserImage(user)}
                            className="h-11 w-11 object-cover rounded-full"
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
                        <p className="text-gray-400">{t('common:locationUnavailable')}</p>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {t(`common:${user.role}`)}
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
