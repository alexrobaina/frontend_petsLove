import { useFormik } from 'formik'
import { FC } from 'react'
import * as Yup from 'yup'

import { ROLES } from '../../constants/community'
import { IAddressComponent, LocationResult } from '../../constants/interfaces'
import { useUserUpdate } from '../../hooks/useUserUpdate'
import { BaseButton } from '../common/BaseButton'
import { BaseInput } from '../common/BaseInput'
import { BaseSelect } from '../common/BaseSelect'
import GoogleAutocomplete from '../common/GoogleAutocomplete'
import { ReactModal } from '../common/ReactModal'

interface Props {
  setOpenRoleModal: (value: boolean) => void
  isOpenRoleModal: boolean
  user: {
    id: string
    role: string
    locationId: string
    username: string
    socialMedia: {
      facebook: string
      instagram: string
      telegram: string
      wattsapp: string
    } | null
    location: {
      country: string
      city: string
      address: string
      lat: number
      lng: number
    }
  }
}

export const userUpdateValidation = Yup.object().shape({
  role: Yup.string().required('Role is required'),
  username: Yup.string().required('Username is required'),
  location: Yup.object().shape({
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('City is required'),
    address: Yup.string().required('Address is required'),
    lat: Yup.number().required('Lat is required'),
    lng: Yup.number().required('Lng is required'),
  }),
})

export const UserRoleSelectorModal: FC<Props> = ({
  user,
  isOpenRoleModal,
  setOpenRoleModal,
}) => {
  const { mutate } = useUserUpdate()
  const formik = useFormik({
    initialValues: {
      username: '',
      role: '',
      location: {
        country: '',
        city: '',
        address: '',
        lat: 0,
        lng: 0,
      },
    },
    validationSchema: userUpdateValidation,
    onSubmit: async (values) => {
      mutate({
        ...values,
        id: user?.id,
        socialMedia: user?.socialMedia || {},
        locationId: user?.locationId || '',
      })

      formik.resetForm()
      setOpenRoleModal(false)
    },
  })

  const { values, errors, handleChange, handleSubmit, setFieldValue } = formik

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

  return (
    <ReactModal
      height="auto"
      isOpen={isOpenRoleModal}
      title="Welcome to Pets Love!"
      description="This information will be used to provide you with the best experience"
    >
      <div className="flex flex-col gap-4">
        <div className="col-span-full mt-8">
          <GoogleAutocomplete
            label="Location"
            error={
              errors?.location &&
              !values?.location?.country &&
              'Location is required'
            }
            placeholder="Search by location"
            setLocation={handleChangeLocation}
          />
        </div>
        <div className="w-full">
          <BaseSelect
            name="role"
            value={values.role}
            error={errors?.role}
            label="Select your role"
            setFieldValue={setFieldValue}
            options={[
              { value: ROLES.ADOPTER, label: ROLES.ADOPTER },
              { value: ROLES.SHELTER, label: ROLES.SHELTER },
              { value: ROLES.VET, label: ROLES.VET },
            ]}
          />
        </div>
        <BaseInput
          name="username"
          label="Username"
          handleChange={handleChange}
          placeholder="Add an username"
          error={errors?.username || ''}
        />
      </div>
      <div className="flex gap-2 mt-5 justify-end">
        <BaseButton text="Save" style="primary" onClick={handleSubmit} />
      </div>
    </ReactModal>
  )
}
