import { FC } from 'react'
import { PetDetail } from '../../../constants/types'

interface vaccine {
  id: String
  name: string
  description: string
  vaccinesStatus: boolean
  createdAt: Date
  updatedAt: Date
  PetVaccines: string[]
}

export const Vaccines: FC<any> = ({ vaccines }) => {
  console.log('vaccines:', vaccines)
  return (
    <>
      <div className="flex justify-between mt-8">
        <h1 className="text-xl md:text-xl lg:text-3xl font-semibold">
          vaccines
        </h1>
      </div>
      <div className="flex flex-col">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-bold text-gray-900"
                    >
                      Vaccine
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-bold text-gray-900"
                    >
                      Description
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-bold text-gray-900"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-bold text-gray-900"
                    >
                      Created at
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {vaccines.map((vaccineList: any) => (
                    <tr key={vaccineList.id}>
                      <td
                        key={vaccineList.name}
                        className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0"
                      >
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {vaccineList.name}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td
                        key={vaccineList.description}
                        className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0"
                      >
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {vaccineList.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          {vaccineList.vaccinesStatus ? 'done' : 'no applied'}
                        </span>
                      </td>
                      <td
                        key={vaccineList.id}
                        className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0"
                      >
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {new Date().toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
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
