import { FormikErrors } from 'formik'
import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { MultiValue } from 'react-select'

import { BaseInput } from '../../../../components/common/BaseInput'
import { BaseSelect } from '../../../../components/common/BaseSelect'
import { BaseTextArea } from '../../../../components/common/BaseTextArea'
import {
  INVENTORY_TYPES,
  ICreateInventoryForm,
  FileType,
} from '../../constants'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  touched: any
  values: ICreateInventoryForm
  errors: FormikErrors<{
    name: string
    type: string
    description: string
    quantity: number
    price: number
  }>
  title: string
  handleChange: (e: ChangeEvent<Element>) => void
  setFieldValue: (
    field: string,
    value: string | number | File | null | MultiValue<unknown>,
  ) => void
  handleNewImage: (e: ChangeEvent<HTMLInputElement>) => void
  handleImageDeletion: (image: FileType) => void
}

export const CreateInventoryForm: React.FC<Props> = ({
  title,
  values,
  errors,
  touched,
  handleChange,
  setFieldValue,
  handleNewImage,
  handleImageDeletion,
}) => {
  const { t } = useTranslation(['common', 'inventory'])

  return (
    <form>
      <h1 className="text-2xl font-medium col-span-full">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8 w-full mt-5">
        <div className="col-span-1/2 flex flex-col gap-3">
          <div className="flex gap-2 md:gap-2 overflow-x-auto w-full">
            {values?.images &&
              values.images.map((image: FileType) =>
                !image.isDeleted ? (
                  <img
                    key={image.url}
                    alt="inventory image"
                    onClick={() => handleImageDeletion(image)}
                    src={`${import.meta.env.VITE_BUCKET_NAME}/inventory/${image.url}`}
                    className="h-12 w-12 flex-none rounded-lg bg-gray-800 object-cover hover:opacity-50 cursor-pointer"
                  />
                ) : null,
              )}
            {values?.newImages &&
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              values.newImages.map((image: any) =>
                !image.isDeleted ? (
                  <img
                    key={image.url}
                    src={image.url}
                    alt="inventory image"
                    onClick={() => handleImageDeletion(image)}
                    className="h-12 w-12 flex-none rounded-lg bg-gray-800 object-cover hover:opacity-50 cursor-pointer"
                  />
                ) : null,
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
            placeholder={t('common:itemName')}
            error={touched.name && t(`inventory:${errors.name}`)}
          />
        </div>
        <div className="sm:col-span-1 w-full">
          <BaseSelect
            translation
            name="type"
            value={values?.type}
            label={t('common:type')}
            options={INVENTORY_TYPES}
            setFieldValue={setFieldValue}
            error={touched.type && t(`inventory:${errors.type}`)}
          />
        </div>
        <div className="sm:col-span-1 w-full">
          <BaseInput
            type="number"
            name="quantity"
            handleChange={handleChange}
            value={values.quantity || ''}
            label={t('inventory:quantity')}
            placeholder={t('inventory:itemQuantity')}
            error={touched.quantity && t(`inventory:${errors.quantity}`)}
          />
        </div>
        <div className="sm:col-span-1 w-full">
          <BaseInput
            name="price"
            type="number"
            value={values.price || ''}
            label={t('inventory:price')}
            handleChange={handleChange}
            placeholder={t('inventory:itemPrice')}
            error={touched.price && t(`inventory:${errors.price}`)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 md:gap-8 w-full mt-5">
        <BaseTextArea
          height={100}
          name="description"
          value={values?.description}
          handleChange={handleChange}
          label={t('common:description')}
          placeholder={t('common:itemDescription')}
          error={touched.description && t(`inventory:${errors?.description}`)}
        />
      </div>
    </form>
  )
}
