import { FormikErrors, FormikValues } from 'formik'
import { t } from 'i18next'
import { FC } from 'react'

import { BaseButton } from '../../../../components/common/BaseButton'
import { BaseInput } from '../../../../components/common/BaseInput'
import { BasePhoneInput } from '../../../../components/common/BasePhoneInput'
import { User } from '../../constants'

interface Props {
  user: User
  errors: FormikErrors<User>
  values: FormikValues
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  setFieldValue: (field: string, value: string) => void
}

export const SocialMediaForm: FC<Props> = ({
  errors,
  values,
  handleChange,
  setFieldValue,
}) => (
  <div className="divide-y mt-14 divide-white/5">
    <div className="flex pr-5 md:pr-12 gap-10">
      <div className="w-[50%]">
        <h2 className="text-xl font-semibold leading-7 text-primary-950">
          {t('settings:socialMediaAndContacts')}
        </h2>
        <p className="mt-1 text-sm leading-6 text-primary-500">
          {t('settings:socialMediaAndContactsDescription')}
        </p>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-full">
          <div className="sm:col-span-3">
            <BaseInput
              label="Instagram"
              handleChange={handleChange}
              name="socialMedia.instagram"
              value={values?.socialMedia?.instagram}
              placeholder={t('settings:instagramPlaceholder')}
            />
          </div>
          <div className="sm:col-span-3">
            <BaseInput
              label="Facebook"
              name="socialMedia.facebook"
              handleChange={handleChange}
              error={errors?.socialMedia?.facebook || ''}
              placeholder='https://www.facebook.com/refigyPaw/'
              value={values?.socialMedia?.facebook}
            />
          </div>
          <div className="sm:col-span-3">
            <BasePhoneInput
              country={'ar'}
              placeholder=""
              label="Whatsapp"
              name="socialMedia.whatsapp"
              setFieldValue={setFieldValue}
              value={values?.socialMedia?.whatsapp}
              error={errors?.socialMedia?.whatsapp}
            />
          </div>
          <div className="sm:col-span-3">
            <BaseInput
              label="Telegram"
              name="socialMedia.telegram"
              handleChange={handleChange}
              error={errors?.socialMedia?.telegram}
              value={values?.socialMedia?.telegram}
              placeholder={t('settings:telegramPlaceholder')}
            />
          </div>
        </div>
        <div className="mt-8 flex">
          <BaseButton type="submit" text={t('common:save') } />
        </div>
      </div>
    </div>
  </div>
)
