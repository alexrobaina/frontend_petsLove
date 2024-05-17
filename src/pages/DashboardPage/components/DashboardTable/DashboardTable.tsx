import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import {
  IconCalendarStats,
  IconEdit,
  IconSearch,
  IconTrash,
} from '../../../../assets/icons'
import { MidDog } from '../../../../assets/images'
import { BaseBadge } from '../../../../components/common/BaseBadge'
import { BaseButton } from '../../../../components/common/BaseButton'
import { BaseInput } from '../../../../components/common/BaseInput'
import { BaseLoading } from '../../../../components/common/BaseLoading'
import { Pagination } from '../../../../components/common/Pagination'

interface Props {
  data: { pets: Pet[] | undefined; total: number | undefined }
  page: number
  searchByName: string
  updatePetLoading: boolean
  setPage(skip: number): void
  handleCreatePet: () => void
  handleEdit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ): void
  handleDelete({
    e,
    petId,
  }: {
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    petId: string
    petName: string
  }): void
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  setOpenAttachment: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => void
}

interface Pet {
  id: string // or number, if the ID is numeric
  age: string // or number, depending on the data type you're using for age
  name: string
  size: string
  gender: string
  category: string
  images: string[] // An array of image URLs (strings)
  adopted: boolean
  description: string
}

export const DashboardTable: React.FC<Props> = ({
  data,
  page,
  setPage,
  handleEdit,
  handleDelete,
  searchByName,
  handleSearch,
  handleCreatePet,
  updatePetLoading,
  setOpenAttachment,
}) => {
  const { t } = useTranslation(['common', 'dashboard'])
  const navigate = useNavigate()
  const goToPet = (id: string) => {
    navigate(`/pet/${id}`)
  }

  const handleError = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e: any,
  ) => {
    const target = e.target as HTMLImageElement
    target.onerror = null // Prappointments infinite loop if local image is also not found
    target.src = MidDog
  }

  if (updatePetLoading) return <BaseLoading />

  return (
    <>
      <div className="flex justify-between flex-col sm:flex-row sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6 text-primary-950">
            {t('common:pets')}
          </h1>
          <p className="mt-2 text-sm text-primary-500">
            {t('dashboard:listOfPets')}
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <BaseButton
            size="small"
            type="button"
            style="primary"
            onClick={handleCreatePet}
            text={t('dashboard:addPet')}
          />
        </div>
      </div>
      <div className="mt-5">
        <BaseInput
          type="text"
          value={searchByName}
          iconLeft={<IconSearch />}
          handleChange={handleSearch}
          placeholder={t('searchPets')}
          label={t('common:searchByName')}
        />
      </div>
      {data?.total === 0 && (
        <div className="h-[550px] w-full flex flex-col gap-5 justify-center items-center">
          <h1 className="text-3xl font-semibold">
            {t('dashboard:petNotFound')}
          </h1>
          <h1>{t('dashboard:dontHavePets')}</h1>
          <BaseButton
            size="small"
            type="button"
            onClick={handleCreatePet}
            text={t('dashboard:addPet')}
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
                      {t('common:gender')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left bg-primary-100 text-sm font-semibold text-primary-950"
                    >
                      {t('common:category')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left bg-primary-100 text-sm font-semibold text-primary-950"
                    >
                      {t('common:age')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left bg-primary-100 text-sm font-semibold text-primary-950"
                    >
                      {t('common:size')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left bg-primary-100 text-sm font-semibold text-primary-950"
                    >
                      {t('common:status')}
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
                  {data?.pets &&
                    data?.pets.map((pet: Pet, index: number) => (
                      <tr
                        key={pet.id}
                        onClick={() => goToPet(pet.id)}
                        className="hover:bg-primary-100 cursor-pointer"
                      >
                        <td
                          className={`whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-6 ${index === 0 ? 'rounded-tx-none' : 'rounded-s-xl'}`}
                        >
                          <div className="flex items-center">
                            <div className="h-11 w-11 flex-shrink-0">
                              <img
                                alt="pet-image"
                                onError={handleError}
                                className="h-11 w-11 object-cover rounded-full"
                                src={`${import.meta.env.VITE_BUCKET_NAME}pets/${pet?.images[0]}`}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="capitalize font-medium text-primary-950">
                                {pet.name}
                              </div>
                              <div className="truncate w-[250px] mt-1 text-gray-500">
                                {pet.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="capitalize whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {`${t(`common:genderPet.${pet.gender}`)}`}
                        </td>
                        <td className="capitalize whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {`${t(`common:categoryPet.${pet.category}`)}`}
                        </td>
                        <td className="capitalize whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {`${t(`common:agePet.${pet.age}`)}`}
                        </td>
                        <td className="capitalize whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {`${t(`common:sizePet.${pet.size}`)}`}
                        </td>
                        <td className="capitalize whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <BaseBadge
                            color={
                              pet.adopted ? 'text-green-50' : 'bg-green-200'
                            }
                            backgroundColor={
                              pet.adopted ? 'bg-red-500' : 'bg-green-200'
                            }
                            text={
                              pet.adopted
                                ? t('common:adopted')
                                : t('common:available')
                            }
                          />
                        </td>
                        <td
                          className={`whitespace-nowrap px-6 py-4 ${index === 0 ? 'rounded-br-xl' : 'rounded-e-xl'}`}
                        >
                          <div className="flex gap-2 justify-end">
                            <BaseButton
                              style="tertiary"
                              icon={
                                <IconCalendarStats width={30} height={30} />
                              }
                              onClick={(e) => setOpenAttachment(e, pet.id)}
                            />
                            <BaseButton
                              style="tertiary"
                              icon={<IconEdit />}
                              onClick={(e) => handleEdit(e, pet.id)}
                            />
                            <BaseButton
                              style="tertiary"
                              onClick={(e) =>
                                handleDelete({
                                  e,
                                  petId: pet.id,
                                  petName: pet.name,
                                })
                              }
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
