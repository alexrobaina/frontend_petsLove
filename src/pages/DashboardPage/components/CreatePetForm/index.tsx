import { FormikErrors } from 'formik'
import { ChangeEvent } from 'react'
import { MultiValue } from 'react-select'

import { BaseInput } from '../../../../components/common/BaseInput'
import { BaseSelect } from '../../../../components/common/BaseSelect'
import { BaseTextArea } from '../../../../components/common/BaseTextArea'
import useUserList from '../../../../hooks/useUserList'
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
  handleChange,
  setFieldValue,
  handleNewImage,
  handleImageDeletion,
}) => {
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
                Select a file
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
              JPG, GIF or PNG. 1.5MB max.
            </p>
          </div>
        </div>
      </div>
      <div className="grid mt-4 md:mt-10 grid-cols-1 sm:grid-cols-3 w-full gap-4">
        <div className="sm:col-span-1 w-full">
          <BaseInput
            name="name"
            label="Name"
            error={errors?.name}
            value={values?.name}
            placeholder="Name of pet"
            handleChange={handleChange}
          />
        </div>
        <div className="sm:col-span-1 w-full">
          <BaseSelect
            name="category"
            label="Category"
            options={CATEGORY_PET}
            error={errors.category}
            value={values?.category}
            setFieldValue={setFieldValue}
          />
        </div>
        <div className="sm:col-span-1 w-full">
          <BaseSelect
            name="gender"
            label="Gender"
            options={GENDER_PET}
            error={errors.gender}
            value={values.gender}
            setFieldValue={setFieldValue}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 md:gap-8 w-full mt-5">
        <div className="col-span-1/2">
          <BaseSelect
            name="age"
            label="Age"
            error={errors.age}
            options={AGE_PETS}
            value={values.age}
            setFieldValue={setFieldValue}
          />
        </div>
        <div className="col-span-1/2">
          <BaseSelect
            name="size"
            label="Size"
            options={SIZE_PETS}
            value={values?.size}
            error={errors?.size}
            setFieldValue={setFieldValue}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 w-full mt-5">
        <div className="col-span-1/2">
          <BaseInput
            name="breed"
            label="Breed"
            error={errors?.breed}
            value={values?.breed}
            placeholder="From street"
            handleChange={handleChange}
          />
        </div>
        <div className="col-span-1/2">
          <div className="flex gap-2 md:gap-5 justify-between">
            <BaseInput
              name="weight"
              label="Weight"
              placeholder="0.00"
              error={errors?.weight}
              value={values?.weight}
              handleChange={handleChange}
            />
            <div className="w-[150px]">
              <BaseSelect
                name="units"
                label="Mass units"
                options={MASS_UNIT}
                value={values?.units}
                error={errors?.units}
                setFieldValue={setFieldValue}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 md:gap-8 w-full mt-5">
        <BaseTextArea
          height={100}
          name="description"
          label="Description"
          error={errors.description}
          value={values?.description}
          handleChange={handleChange}
          placeholder="Description of pet"
        />
      </div>
      <div className="mt-6 flex flex-col ">
        <h1 className="text-xl font-medium col-span-full">Pet Guardians</h1>
        <div className="grid grid-cols-2 md:grid-cols-2 w-full mt-5 gap-5">
          <div className="w-full ">
            <BaseSelect
              label="Adopter"
              name="adoptedBy"
              value={values?.adoptedBy}
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
              label="Vet"
              error={errors.vetId}
              value={values?.vetId}
              setFieldValue={setFieldValue}
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
              label="Shelter"
              name="shelterId"
              value={values?.shelterId}
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
