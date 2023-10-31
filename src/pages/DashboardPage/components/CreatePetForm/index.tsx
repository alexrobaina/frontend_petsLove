import { FormikErrors } from 'formik'
import { ChangeEvent, useContext } from 'react'
import { MultiValue } from 'react-select'

import { BaseInput } from '../../../../components/BaseInput'
import { BaseSelect } from '../../../../components/BaseSelect'
import { BaseTextArea } from '../../../../components/BaseTextArea'
import useUserList from '../../../../hooks/useUserList'
import { AppContext } from '../../../../services/AppContext'
import {
  AGE_PETS,
  CATEGORY_PET,
  GENDER_PET,
  ICreatePetForm,
  MASS_UNIT,
  SIZE_PETS,
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
  }>
  handleChange: (e: ChangeEvent<Element>) => void
  setFieldValue: (
    field: string,
    value: string | number | File | null | MultiValue<unknown>,
  ) => void
  urlImagesPreview: string[]
  handleImagesChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const CreatePetForm: React.FC<Props> = ({
  values,
  errors,
  handleChange,
  setFieldValue,
  urlImagesPreview,
  handleImagesChange,
}) => {
  const context = useContext(AppContext)
  const { data: userListShelter } = useUserList({ role: 'SHELTER' })
  const { data: userListAdopter } = useUserList({ role: 'ADOPTER' })

  const shouldGuardiansSelect = ({
    userRole,
    role,
  }: {
    userRole: string | null | undefined
    role: string
  }) => {
    if (userRole === 'ADOPTER') return false
    if (userRole === 'VET') return true
    if (userRole === role) return false

    return true
  }

  return (
    <form>
      <h1 className="text-2xl font-medium col-span-full">Pet details</h1>
      <div className="grid grid-cols-1 md:grid-cols-1  gap-8 w-full mt-5">
        <div className="col-span-1/2 flex flex-col gap-3">
          <div className="flex gap-2 md:gap-2 overflow-x-auto w-full">
            {urlImagesPreview.map((url: string) => (
              <img
                src={url}
                alt="user image"
                className="h-12 w-12 flex-none rounded-lg bg-gray-800 object-cover"
              />
            ))}
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
                onChange={handleImagesChange}
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
          handleChange={handleChange}
          placeholder="Description of pet"
        />
      </div>
      <div className="mt-6 flex flex-col ">
        <h1 className="text-xl font-medium col-span-full">Pet Guardians</h1>
        <div className="grid grid-cols-1 md:grid-cols-1 w-full mt-5">
          <div className="w-full">
            {shouldGuardiansSelect({
              userRole: context.user?.role,
              role: 'SHELTER',
            }) && (
              <BaseSelect
                name="shelterId"
                label="Shelter"
                value={values?.shelterId}
                setFieldValue={setFieldValue}
                options={userListShelter?.users.map(
                  (user: { email: string; id: string }) => ({
                    value: user.id,
                    label: `${user.email} `,
                  }),
                )}
              />
            )}
          </div>
          <div className="w-full">
            {shouldGuardiansSelect({
              userRole: context.user?.role,
              role: 'ADOPTER',
            }) && (
              <BaseSelect
                name="adoptedBy"
                label="Adopter"
                value={values?.adopterId}
                setFieldValue={setFieldValue}
                options={userListAdopter?.users.map(
                  (user: { email: string; id: string }) => ({
                    value: user.id,
                    label: `${user.email} `,
                  }),
                )}
              />
            )}
          </div>
        </div>
      </div>
    </form>
  )
}
