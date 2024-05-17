import React from 'react'
import { useTranslation } from 'react-i18next'

interface Contact {
  id: string
  email: string
  phone?: string
  username?: string
  firstname?: string
}

interface Pet {
  Adopter?: Contact
  Shelter?: Contact
}

interface ContactInfoProps {
  pet: Pet
  values: { recipientId?: string }
  setFieldValue: (
    field: string,
    value:
      | {
          id: string
          email: string
          firstname?: string
          username?: string | undefined
        }
      | string
      | undefined,
    shouldValidate?: boolean,
  ) => void
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
  pet,
  values,
  setFieldValue,
}) => {
  const { t } = useTranslation('common')

  return (
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 mt-2">
      {pet?.Adopter?.email && (
        <div
          onClick={() => setFieldValue('recipientId', pet?.Adopter?.id || '')}
          className={`flex cursor-pointer flex-col p-4 gap-4 rounded-lg ${
            pet.Adopter.id === values.recipientId
              ? 'bg-primary-600 text-primary-100'
              : 'bg-primary-200 text-primary-900'
          }`}
        >
          <div className="flex flex-col gap-1 justify-between w-[185px]">
            <p className="text-base font-semibold">{t('adopter')}</p>
            <p className="text-sm">
              {pet.Adopter.username || pet.Adopter.firstname}
            </p>
            <p className="text-sm">{`${t('email')}: ${pet.Adopter.email}`}</p>
            {pet.Adopter.phone && (
              <p className="text-sm">{`${t('phone')}: ${pet.Adopter.phone}`}</p>
            )}
          </div>
        </div>
      )}
      {pet?.Shelter?.email && (
        <div
          onClick={() => setFieldValue('recipientId', pet?.Shelter?.id || '')}
          className={`flex cursor-pointer flex-col p-4 gap-4 rounded-lg ${
            pet.Shelter.id === values.recipientId
              ? 'bg-primary-600 text-primary-100'
              : 'bg-primary-200 text-primary-900'
          }`}
        >
          <div className="flex flex-col gap-1 justify-between w-[185px]">
            <p className="text-base font-semibold">{t('shelter')}</p>
            <p className="text-sm">
              {pet.Shelter.username || pet.Shelter.firstname}
            </p>
            <p className="text-sm">{`${t('email')}: ${pet.Shelter.email}`}</p>
          </div>
        </div>
      )}
    </div>
  )
}
