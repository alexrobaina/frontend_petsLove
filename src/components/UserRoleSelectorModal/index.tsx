import { useFormik } from 'formik'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

import { ROLES } from '../../constants/community'
import { IAddressComponent, LocationResult } from '../../constants/interfaces'
import { useUserUpdate } from '../../hooks/user/useUserUpdate'
import { BaseButton } from '../common/BaseButton'
import { BaseInput } from '../common/BaseInput'
import { BaseSelect } from '../common/BaseSelect'
import GoogleAutocomplete from '../common/GoogleAutocomplete'
import { ReactModal } from '../common/ReactModal'

interface Props {
  isOpenRoleModal: boolean
  setOpenRoleModal: (value: boolean) => void
  user: {
    id?: string
    role?: string
    locationId?: string
    username?: string
    socialMedia?: {
      facebook?: string
      instagram?: string
      telegram?: string
      wattsapp?: string
    } | null
    location?: {
      country?: string
      city?: string
      address?: string
      lat?: number
      lng?: number
    }
  }
}

export const userUpdateValidation = Yup.object().shape({
  role: Yup.string().required('isRequired'),
  username: Yup.string().required('isRequired'),
  location: Yup.object().shape({
    country: Yup.string().required('isRequired'),
    city: Yup.string().required('isRequired'),
    address: Yup.string().required('isRequired'),
    lat: Yup.number().required('isRequired'),
    lng: Yup.number().required('isRequired'),
  }),
})

export const UserRoleSelectorModal: FC<Props> = ({
  user,
  isOpenRoleModal,
  setOpenRoleModal,
}) => {
  const { t } = useTranslation('common')
  const { mutate } = useUserUpdate()
  const formik = useFormik({
    initialValues: {
      username: '',
      role: '',
      location: {
        lat: 0,
        lng: 0,
        city: '',
        address: '',
        country: '',
      },
    },
    validationSchema: userUpdateValidation,
    onSubmit: async (values) => {
      mutate({
        ...values,
        id: user?.id || '',
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
      title={t('welcome')}
      description={t('welcomeDescription')}
    >
      <div className="flex flex-col gap-4">
        <div className="col-span-full mt-8">
          <GoogleAutocomplete
            label="Location"
            error={
              errors?.location && !values?.location?.country && t('isRequired')
            }
            placeholder={t('searchByLocation')}
            setLocation={handleChangeLocation}
          />
        </div>
        <div className="w-full">
          <BaseSelect
            name="role"
            value={values.role}
            error={errors?.role}
            label={t('selectTole')}
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
          label={t('username')}
          handleChange={handleChange}
          placeholder={t('username')}
          error={errors?.username || ''}
        />
      </div>
      <div className="flex gap-2 mt-5 justify-end">
        <BaseButton text={t('save')} style="primary" onClick={handleSubmit} />
      </div>
    </ReactModal>
  )
}
