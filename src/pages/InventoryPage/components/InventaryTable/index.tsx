import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { IconEdit, IconTrash } from '../../../../assets/icons'
import { MidDog } from '../../../../assets/images'
import { BaseSelect } from '../../../../components'
import { BaseButton } from '../../../../components/common/BaseButton'
import { BaseInput } from '../../../../components/common/BaseInput'
import { BaseLoading } from '../../../../components/common/BaseLoading'
import { Pagination } from '../../../../components/common/Pagination'
import { INVENTORY_TYPES } from '../../constants'

interface Props {
  data: {
    data: Inventory[] | undefined
    total: number
  }
  page: number
  name: string
  updateInventoryLoading: boolean
  quantity: string
  setPage(skip: number): void
  handleCreateInventory: () => void
  handleEdit(e: React.MouseEvent<HTMLButtonElement>, id: string): void
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void
  inventoryType: string
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleQuantityChange: (e: ChangeEvent<HTMLInputElement>) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleInventoryTypeChange: (type: string, value: any) => void
}

interface Inventory {
  id: string
  name: string
  type: string
  price: number
  images: string[]
  quantity: string
  description: string
}

export const InventoryTable: React.FC<Props> = ({
  data,
  page,
  name,
  setPage,
  quantity,
  handleEdit,
  handleDelete,
  inventoryType,
  handleNameChange,
  handleQuantityChange,
  handleCreateInventory,
  updateInventoryLoading,
  handleInventoryTypeChange,
}) => {
  const { t } = useTranslation(['common', 'inventory'])
  const navigate = useNavigate()
  const goToInventory = (id: string) => {
    navigate(`/inventory/${id}`)
  }

  const handleError = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e: any,
  ) => {
    const target = e.target as HTMLImageElement
    target.onerror = null // Prevent infinite loop if local image is also not found
    target.src = MidDog
  }

  if (updateInventoryLoading) return <BaseLoading />

  return (
    <>
      <div className="flex justify-between flex-col sm:flex-row sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6 text-primary-950">
            {t('common:inventory')}
          </h1>
          <p className="mt-2 text-sm text-primary-500">
            {t('inventory:listOfInventory')}
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <BaseButton
            size="small"
            type="button"
            style="primary"
            onClick={handleCreateInventory}
            text={t('inventory:addInventory')}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5">
        <BaseInput
          type="text"
          value={name}
          label={t('common:name')}
          handleChange={handleNameChange}
          placeholder={t('inventory:filterByName')}
        />
        <BaseSelect
          translation
          name="type"
          value={inventoryType}
          label={t('common:type')}
          options={INVENTORY_TYPES}
          setFieldValue={handleInventoryTypeChange}
        />
        <BaseInput
          type="number"
          value={quantity}
          handleChange={handleQuantityChange}
          label={t('inventory:quantity')}
          placeholder={t('inventory:filterByQuantity')}
        />
      </div>
      {data?.total === 0 && (
        <div className="h-[550px] w-full flex flex-col gap-5 justify-center items-center">
          <h1 className="text-xl sm:text-3xl font-semibold">
            {t('inventory:inventoryNotFound')}
          </h1>
          <h1>{t('inventory:dontHaveInventory')}</h1>
          <BaseButton
            size="small"
            type="button"
            onClick={handleCreateInventory}
            text={t('inventory:addInventory')}
          />
        </div>
      )}
      {data?.total !== 0 && (
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
                      className="px-3 py-3.5 text-left bg-primary-100 text-sm font-semibold text-primary-950"
                    >
                      {t('common:type')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left bg-primary-100 text-sm font-semibold text-primary-950"
                    >
                      {t('common:description')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left bg-primary-100 text-sm font-semibold text-primary-950"
                    >
                      {t('common:quantity')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left bg-primary-100 text-sm font-semibold text-primary-950"
                    >
                      {t('common:price')}
                    </th>
                    <th
                      scope="col"
                      className="px-8 py-3.5 text-right bg-primary-100 text-sm font-semibold text-primary-950 rounded-tr-xl"
                    >
                      {t('common:actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white rounded-3xl">
                  {data?.data &&
                    data.data.map((item: Inventory, index: number) => (
                      <tr
                        key={item.id}
                        onClick={() => goToInventory(item.id)}
                        className="hover:bg-primary-100 cursor-pointer"
                      >
                        <td
                          className={`whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-6 ${
                            index === 0 ? 'rounded-tx-none' : 'rounded-s-xl'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className="h-11 w-11 flex-shrink-0">
                              <img
                                alt="inventory-image"
                                onError={handleError}
                                className="h-11 w-11 object-cover rounded-full"
                                src={`${import.meta.env.VITE_BUCKET_NAME}inventory/${item?.images[0]}`}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="capitalize font-medium text-primary-950">
                                {item.name}
                              </div>
                              <div className="truncate w-[250px] mt-1 text-gray-500">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="capitalize whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {`${t(`inventory:inventoryType.${item.type}`)}`}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.description}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.quantity}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {item.price}
                        </td>
                        <td
                          className={`whitespace-nowrap px-6 py-4 ${
                            index === 0 ? 'rounded-br-xl' : 'rounded-e-xl'
                          }`}
                        >
                          <div className="flex gap-2 justify-end">
                            <BaseButton
                              style="tertiary"
                              icon={<IconEdit />}
                              onClick={(e) => handleEdit(e, item.id)}
                            />
                            <BaseButton
                              style="tertiary"
                              onClick={(e) => handleDelete(e, item.id)}
                              icon={<IconTrash />}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
            take={10}
            page={page}
            setPage={setPage}
            total={data?.total || 0}
          />
        </div>
      )}
    </>
  )
}
