import { FormikErrors } from 'formik'
import { ChangeEvent } from 'react'

import { BaseButton } from '../../../../components/BaseButton'
import { BaseInput } from '../../../../components/BaseInput'
import { BaseSelect } from '../../../../components/BaseSelect'
import { BaseTextArea } from '../../../../components/BaseTextArea'
import useUserList from '../../../../hooks/useUserList'
import { useGetVaccine } from '../../../../hooks/useVaccine'
import { AGE_PETS, CATEGORY_PET, GENDER_PET, SIZE_PETS } from '../../constants'
import { VaccinesTable } from '../VaccinesTable'

interface Props {
  values: {
    age: string
    name: string
    units: string
    gender: string
    weight: string
    size: string
    breed: string
    description: string
    veterinaryId: string
    shelterId: string
    adopterId: string
    category: string
  }
  errors: FormikErrors<{
    age: string
    name: string
    units: string
    gender: string
    weight: string
    size: string
    breed: string
    description: string
    veterinaryId: string
    shelterId: string
    adopterId: string
    category: string
  }>
  handleChange: (e: ChangeEvent<Element>) => void
  setFieldValue: (field: string, value: string) => void
}

export const CreatePetForm: React.FC<Props> = ({
  values,
  errors,
  handleChange,
  setFieldValue,
}) => {
  const { data: vaccinesList } = useGetVaccine({ category: values?.category })
  const { data: userListVeterinary } = useUserList({ role: 'VET' })
  const { data: userListShelter } = useUserList({ role: 'SHELTER' })
  const { data: userListAdopter } = useUserList({ role: 'ADOPTER' })

  return (
    <form>
      <div className="grid sm:grid-cols-2 w-full">
        <h1 className="text-2xl font-medium col-span-full">Pet details</h1>
        <div className="mt-6 col-span-full flex items-center gap-x-8">
          <div className="sm:col-span-2 w-full">
            <BaseInput
              name="name"
              label="Name"
              value={values?.name}
              placeholder="Name of pet"
              handleChange={handleChange}
              // error={errors?.firstName}
              // handleChange={handleChange}
              // value={values?.firstName || user?.firstName}
            />
          </div>
          <div className="sm:col-span-2 w-full">
            <BaseSelect
              name="category"
              label="Category"
              options={CATEGORY_PET}
              value={values?.category}
              setFieldValue={setFieldValue}
            />
          </div>
          <div className="sm:col-span-2 w-full">
            <BaseSelect
              name="gender"
              label="Gender"
              options={GENDER_PET}
              value={values.gender}
              setFieldValue={setFieldValue}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 w-full mt-5">
        <div className="col-span-1/2">
          <BaseSelect
            name="age"
            label="Age"
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
      <div className="grid grid-cols-2 gap-8 w-full mt-5">
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
          <div className="flex gap-5 w-full">
            <BaseInput
              name="weight"
              label="Weight"
              placeholder="0.00"
              error={errors?.weight}
              value={values?.weight}
              handleChange={handleChange}
            />
            <BaseInput
              name="units"
              label="Units"
              placeholder="kg"
              error={errors?.units}
              handleChange={handleChange}
              value={values?.units}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 w-full mt-5">
        <BaseTextArea
          height={100}
          name="description"
          label="Description"
          placeholder="Description of pet"
          handleChange={handleChange}
        />
      </div>
      <div className="mt-6 flex flex-col ">
        <h1 className="text-xl font-medium col-span-full">Cares</h1>
        <div className="grid grid-cols-3 gap-8 w-full mt-5">
          <div className="sm:col-span-1/3 w-full">
            {userListVeterinary && (
              <BaseSelect
                name="veterinary"
                label="Veterinary"
                setFieldValue={setFieldValue}
                value={values?.veterinaryId}
                options={userListVeterinary?.users.map(
                  (user: { email: string; id: string }) => ({
                    value: user.id,
                    label: `${user.email} `,
                  }),
                )}
              />
            )}
          </div>
          <div className="sm:col-span-1/3 w-full">
            {userListShelter && (
              <BaseSelect
                name="shelter"
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
          <div className="sm:col-span-1/3 w-full">
            {userListAdopter && (
              <BaseSelect
                name="adopter"
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
        <div className="mt-6 flex flex-col gap-4 ">
          <h1 className="text-xl font-medium col-span-full">Medical records</h1>
          <div className="flex justify-start w-full">
            <BaseButton
              type="button"
              className="w-[100px]"
              text="Add Medical Recordas"
            />
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-4 ">
          <h1 className="text-xl font-medium col-span-full">Vaccines</h1>
          <p className="mt-2 text-sm text-gray-700">
            {`A list of vaccunes that your pet has received or needs to receive.
            You can add a new vaccine by clicking the button below.
            `}
          </p>
        </div>
        <VaccinesTable vaccines={vaccinesList?.vaccines} />
        <div className="mt-8 flex justify-start w-full">
          <BaseButton type="button" className="w-[100px]" text="Add Vaccine" />
        </div>
      </div>
    </form>
  )
}
