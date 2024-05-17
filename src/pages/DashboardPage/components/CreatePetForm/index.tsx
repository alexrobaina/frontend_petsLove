import { FormikErrors } from 'formik'
import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { MultiValue } from 'react-select'

import { BaseInput } from '../../../../components/common/BaseInput'
import { BaseSelect } from '../../../../components/common/BaseSelect'
import { BaseTextArea } from '../../../../components/common/BaseTextArea'
import useUserList from '../../../../hooks/user/useUserList'
import {
  AGE_PETS,
  CATEGORY_PET,
  GENDER_PET,
  ICreatePetForm,
  MASS_UNIT,
  SIZE_PETS,
  FileType,
} from '../../constants'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  touched: any
  values: ICreatePetForm
  errors: FormikErrors<{
    age: string
    name: string
    units: string
    gender: string
    weight: string
    size: string
    breed: string
    description: string
    shelterId: string
    adoptedBy: string
    category: string
    vetId: string
  }>
  images: FileType[]
  title: string
  handleChange: (e: ChangeEvent<Element>) => void
  setFieldValue: (
    field: string,
    value: string | number | File | null | MultiValue<unknown>,
  ) => void
  isEdit: boolean
  handleNewImage: (e: ChangeEvent<HTMLInputElement>) => void
  handleImageDeletion: (image: FileType) => void
}

export const CreatePetForm: React.FC<Props> = ({
  title,
  values,
  errors,
  images,
  isEdit,
  touched,
  handleChange,
  setFieldValue,
  handleNewImage,
  handleImageDeletion,
}) => {
  const { t } = useTranslation(['common', 'dashboard'])
  const { data: userListShelter } = useUserList({ role: 'SHELTER' })
  const { data: userListAdopter } = useUserList({ role: 'ADOPTER' })
  const { data: userListVet } = useUserList({ role: 'VET' })

  return (
    <form>
      <h1 className="text-2xl font-medium col-span-full">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-1  gap-8 w-full mt-5">
        <div className="col-span-1/2 flex flex-col gap-3">
          <div className="flex gap-2 md:gap-2 overflow-x-auto w-full">
            {images &&
              images.map(
                (image: FileType) =>
                  !image.isNew &&
                  !image.isDeleted && (
                    <img
                      key={image.url}
                      alt="pet image"
                      onClick={() => handleImageDeletion(image)}
                      src={`${import.meta.env.VITE_BUCKET_NAME}/pets/${image.url}`}
                      className="h-12 w-12 flex-none rounded-lg bg-gray-800 object-cover :hover:opacity-50 cursor-pointer"
                    />
                  ),
              )}
            {images.map(
              (image: FileType) =>
                image.isNew && (
                  <img
                    src={image.url}
                    alt="user image"
                    onClick={() => handleImageDeletion(image)}
                    className="h-12 w-12 flex-none rounded-lg bg-gray-800 object-cover :hover:opacity-50 cursor-pointer"
                  />
                ),
            )}
          </div>
          <div>
            <div className="flex w-full">
              <label
                htmlFor="file"
                className="w-full rounded px-2 py-1 text-sm font-semibold text-primary-950 shadow-sm ring-1 ring-inset ring-primary-300 hover:bg-primary-300"
              >
                {t('common:selectImages')}
              </label>
              <input
                multiple
                id="file"
                type="file"
                name="images"
                className="hidden"
                onChange={handleNewImage}
              />
            </div>
            <p className="mt-2 text-xs leading-5 text-gray-400">
              {t('common:selectImagesInfo')}
            </p>
          </div>
        </div>
      </div>
      <div className="grid mt-4 md:mt-10 grid-cols-1 sm:grid-cols-3 w-full gap-4">
        <div className="sm:col-span-1 w-full">
          <BaseInput
            name="name"
            value={values?.name}
            label={t('common:name')}
            handleChange={handleChange}
            placeholder={t('common:petName')}
            error={touched.name && t(`dashboard:${errors.name}`)}
          />
        </div>
        <div className="sm:col-span-1 w-full">
          <BaseSelect
            translation
            name="category"
            options={CATEGORY_PET}
            value={values?.category}
            label={t('common:category')}
            setFieldValue={setFieldValue}
            error={touched.category && t(`dashboard:${errors.category}`)}
          />
        </div>
        <div className="sm:col-span-1 w-full">
          <BaseSelect
            translation
            name="gender"
            options={GENDER_PET}
            value={values.gender}
            label={t('common:gender')}
            setFieldValue={setFieldValue}
            error={touched.gender && t(`dashboard:${errors.gender}`)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 md:gap-8 w-full mt-5">
        <div className="col-span-1/2">
          <BaseSelect
            name="age"
            translation
            value={values.age}
            options={AGE_PETS}
            label={t('common:age')}
            setFieldValue={setFieldValue}
            error={touched.age && t(`dashboard:${errors.age}`)}
          />
        </div>
        <div className="col-span-1/2">
          <BaseSelect
            name="size"
            translation
            options={SIZE_PETS}
            value={values?.size}
            label={t('common:size')}
            setFieldValue={setFieldValue}
            error={touched.size && t(`dashboard:${errors.size}`)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 w-full mt-5">
        <div className="col-span-1/2">
          <BaseInput
            name="breed"
            value={values?.breed}
            label={t('common:breed')}
            handleChange={handleChange}
            placeholder={t('common:petBreed')}
          />
        </div>
        <div className="col-span-1/2">
          <div className="flex gap-2 md:gap-5 justify-between">
            <BaseInput
              name="weight"
              placeholder="0.00"
              value={values?.weight}
              label={t('common:weight')}
              handleChange={handleChange}
              error={touched.weight && t(`dashboard:${errors.weight}`)}
            />
            <div className="w-[185px]">
              <BaseSelect
                name="units"
                options={MASS_UNIT}
                value={values?.units}
                label={t('common:massUnit')}
                setFieldValue={setFieldValue}
                error={touched.units && t(`dashboard:${errors.units}`)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 md:gap-8 w-full mt-5">
        <BaseTextArea
          height={100}
          name="description"
          value={values?.description}
          handleChange={handleChange}
          label={t('common:description')}
          placeholder={t('common:petDescription')}
          error={touched.description && t(`dashboard:${errors?.description}`)}
        />
      </div>
      <div className="mt-6 flex flex-col ">
        <h1 className="text-xl font-medium col-span-full">
          {t('common:petGuardians')}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-2 w-full mt-5 gap-5">
          <div className="w-full ">
            <BaseSelect
              name="adoptedBy"
              placeholder={t('common:selectAdopter')}
              value={values?.adoptedBy}
              label={t('common:adoptedBy')}
              setFieldValue={setFieldValue}
              options={userListAdopter?.users.map(
                (user: { email: string; id: string }) => ({
                  value: user.id,
                  label: `${user.email} `,
                }),
              )}
            />
          </div>
          <div className="w-full">
            <BaseSelect
              name="vetId"
              error={errors.vetId}
              value={values?.vetId}
              label={t('common:vet')}
              setFieldValue={setFieldValue}
              placeholder={t('common:selectVeterinary')}
              options={userListVet?.users.map(
                (user: { email: string; id: string }) => ({
                  value: user.id,
                  label: `${user.email} `,
                }),
              )}
            />
          </div>
        </div>
        {isEdit && (
          <div className="w-full mt-4">
            <BaseSelect
              name="shelterId"
              placeholder={t('common:selectShelter')}
              value={values?.shelterId}
              label={t('common:shelter')}
              setFieldValue={setFieldValue}
              options={userListShelter?.users.map(
                (user: { email: string; id: string }) => ({
                  value: user.id,
                  label: `${user.email} `,
                }),
              )}
            />
          </div>
        )}
      </div>
    </form>
  )
}
