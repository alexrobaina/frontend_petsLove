import { FormikErrors, FormikValues } from 'formik'
import { ChangeEvent, FC, useState } from 'react'
import { MultiValue } from 'react-select'

import MidDog from '../../../../assets/images/mid-dog.png'
import { BaseButton } from '../../../../components/common/BaseButton'
import { BaseInput } from '../../../../components/common/BaseInput'
import { BaseSelect } from '../../../../components/common/BaseSelect'
import { BaseTextArea } from '../../../../components/common/BaseTextArea'
import GoogleAutocomplete from '../../../../components/common/GoogleAutocomplete'
import { BUCKET_AVATAR_USER } from '../../../../constants/buketsImage'
import { ROLES } from '../../../../constants/community'
import {
  IAddressComponent,
  LocationResult,
} from '../../../../constants/interfaces'
import { User } from '../../constants'

interface Props {
  user: User
  errors?: FormikErrors<User> | undefined
  values: FormikValues
  setFieldValue: (
    field: string,
    value: string | number | File | null | MultiValue<unknown>,
  ) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const PersonalInformationForm: FC<Props> = ({
  user,
  errors,
  values,
  handleChange,
  setFieldValue,
}) => {
  const [previewURL, setPreviewURL] = useState('')

  const handleChangeLocation = (result: LocationResult) => {
    const addressComponents: IAddressComponent[] =
      result.results[0].address_components

    addressComponents.forEach((component: IAddressComponent) => {
      if (component.types.includes('locality')) {
        setFieldValue('location.city', component.long_name || '')
      }
      if (component.types.includes('country')) {
        setFieldValue('location.country', component.long_name || '')
      }

      setFieldValue(
        'location.address',
        result?.results[0]?.formatted_address || '',
      )
      setFieldValue('location.lng', result?.latLng?.lat)
      setFieldValue('location.lat', result?.latLng?.lng)
    })
  }

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null
    setFieldValue('image', selectedFile)

    if (selectedFile) {
      setPreviewURL(URL.createObjectURL(selectedFile))
    }
  }

  const options = [
    { value: ROLES.ADOPTER, label: ROLES.ADOPTER },
    { value: ROLES.SHELTER, label: ROLES.SHELTER },
    { value: ROLES.VET, label: ROLES.VET },
    { value: ROLES.VOLUNTEER, label: ROLES.VOLUNTEER },
  ]

  const isGoogleAvatar =
    user?.image && user?.image?.includes('googleusercontent' || 'ggpht')

  const showImage = isGoogleAvatar
    ? user?.image
    : `${BUCKET_AVATAR_USER}${user?.image}`

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.onerror = null // Prevents infinite loop if local image is also not found
    target.src = MidDog
  }

  return (
    <div className="divide-y mt-20 divide-white/5">
      <div className="flex pr-5 md:pr-12 gap-10">
        <div className="w-[50%]">
          <h2 className="text-base font-semibold leading-7 text-primary-950">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            Use a permanent address where you can receive mail.
          </p>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-full">
            <div className="col-span-full flex items-center gap-x-8">
              <img
                alt="user image"
                onError={handleError}
                src={previewURL ? previewURL : showImage}
                className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
              />
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="file"
                    className="sm:w-auto w-full rounded px-2 py-1 text-sm font-semibold text-primary-950 shadow-sm ring-1 ring-inset ring-primary-300 hover:bg-primary-300"
                  >
                    Select a file
                  </label>
                  <input
                    id="file"
                    type="file"
                    name="images"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
                <p className="mt-2 text-xs leading-5 text-gray-400">
                  JPG, GIF or PNG. 1.5MB max.
                </p>
              </div>
            </div>
            <div className="sm:col-span-3">
              <BaseInput
                name="firstName"
                label="First name"
                error={errors?.firstName}
                value={values?.firstName}
                handleChange={handleChange}
                placeholder={user?.firstName || 'First name'}
              />
            </div>
            <div className="sm:col-span-3">
              <BaseInput
                name="lastName"
                label="Last name"
                error={errors?.lastName}
                value={values?.lastName}
                handleChange={handleChange}
                placeholder={user?.lastName || 'Last name'}
              />
            </div>
            <div className="sm:col-span-3">
              <BaseInput
                name="username"
                label="Username"
                error={errors?.username}
                value={values?.username}
                handleChange={handleChange}
                placeholder={user?.username || 'Username'}
              />
            </div>
            <div className="sm:col-span-3">
              <BaseSelect
                name="role"
                isDisabled
                label="Role"
                options={options}
                error={errors?.role}
                setFieldValue={setFieldValue}
                value={values?.role || user?.role}
              />
            </div>
            <div className="col-span-full">
              <BaseInput
                isdisabled
                value={values?.email}
                label="Email address"
                placeholder={user?.email || 'Email address'}
              />
            </div>
            <div className="col-span-full">
              <BaseTextArea
                height={100}
                name="description"
                value={values?.description}
                handleChange={handleChange}
                error={errors?.description}
                placeholder={user?.description || 'Add a description about you'}
              />
            </div>
          </div>
          <div className="mt-8 flex">
            <BaseButton type="submit" text="Save" />
          </div>
        </div>
      </div>
      <div className="flex pr-5 md:pr-12 gap-10 mt-14">
        <div className="w-[50%]">
          <h2 className="text-base font-semibold leading-7 text-primary-950">
            Location
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            If you are a shelter, please add your location. it is important to
            be able to locate you.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-full">
          <div className="col-span-full">
            <GoogleAutocomplete
              label="Location"
              setLocation={handleChangeLocation}
              placeholder={user?.location?.address || 'Search by location'}
            />
          </div>
          <div className="mt-8 flex">
            <BaseButton type="submit" text="Save" />
          </div>
        </div>
      </div>
    </div>
  )
}
