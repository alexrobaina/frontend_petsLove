import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { IconEdit } from '../../../../assets/icons'
import { BaseBadge } from '../../../../components/common/BaseBadge'
import { BaseButton } from '../../../../components/common/BaseButton'
import { useGetPet } from '../../../../hooks/useGetPet'
import { AppContext } from '../../../../services/AppContext'

export interface IVaccine {
  status: string
  Vaccine: {
    name: string
    description: string
  }
  id: string
  name: string
  date: string
  nextDueDate: string
}
interface Props {
  vaccines?: IVaccine[] | undefined
  handleEditVaccine(data: IVaccine): void
  // handleOpenModalDeleteVaccine(data: IVaccine): void
}

export const VaccinesTable: React.FC<Props> = ({
  vaccines,
  handleEditVaccine,
  // handleOpenModalDeleteVaccine,
}) => {
  const { t } = useTranslation(['common', 'profilePet', 'vaccine'])
  const context = useContext(AppContext)
  const { id } = useParams()
  const { data } = useGetPet(id)

  const checkIfUserIsOwner = () => {
    if (data.pet.createdBy === context?.user?.id) return true
    if (data.pet.shelterId === context?.user?.id) return true
    if (data.pet.adoptedBy === context?.user?.id) return true

    return false
  }

  return (
    <>
      <div className="mt-8 px-4 md:px-0 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      {t('profilePet:vaccine')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      {t('common:status')}
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-10 text-end text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      {t('common:actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {vaccines &&
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    vaccines.map((item: IVaccine) => (
                      <tr className='hover:bg-primary-100' key={item.id}>
                        <td className="flex flex-col py-2 pl-4 pr-3sm:pl-6">
                          <div className="text-sm font-medium text-gray-900 ">
                            {t(`vaccine:${item?.Vaccine.name}`)}
                          </div>
                          <div className="text-gray-400 truncate w-[350px]">
                          {t(`vaccine:${item?.Vaccine.name}`)}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <BaseBadge
                            text={t(`vaccine:${item.status}`)}
                            backgroundColor={
                              item.status === 'PENDING'
                                ? 'bg-red-300'
                                : item.status === 'DONE'
                                ? 'bg-green-300'
                                : 'bg-yellow-300'
                            }
                          />
                        </td>
                        {checkIfUserIsOwner() && (
                          <td className="whitespace-nowrap px-3 py- pr-14">
                            <div className="flex gap-2 justify-end">
                              <BaseButton
                                style="tertiary"
                                icon={<IconEdit />}
                                onClick={() => handleEditVaccine(item)}
                              />
                              {/* <BaseButton
                                style="tertiary"
                                icon={<IconTrash />}
                                onClick={() =>
                                  handleOpenModalDeleteVaccine(item)
                                }
                              /> */}
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
