import { useTranslation } from 'react-i18next'

import { DetailCard } from '../DetailCard'

interface Props {
  data: {
    age: string
    size: string
    breed: string
    weight: string
    gender: string
    qrCode: string
    category: string
    description: string
  }
}

export const GeneralPetInfo: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation(['common'])
  return (
    <>
      <div className="flex flex-wrap gap-4 lg:gap-x-0 justify-between mt-4 w-70 md:w-full lg:w-full">
        <DetailCard title={`${t('common:category')}:`} description={t(`common:categoryPet.${data.category}`)} />
        <DetailCard title={`${t('common:weight')}:`} description={t(data.weight)} />
        <DetailCard title={`${t('common:breed')}:`} description={data.breed} />
        <DetailCard title={`${t('common:size')}:`} description={t(`common:sizePet.${data.size}`)} />
        <DetailCard title={`${t('common:gender')}:`} description={t(`common:genderPet.${data.gender}`)} />
        <DetailCard title={`${t('common:age')}:`} description={t(`common:agePet.${data.age}`)} />
      </div>
      <div className="flew-col gap-10 md:justify-between md:flex">
        <div className="mt-10 flex-col md:w-[50%]">
          <div>
            <h2 className="mt-10 text-lg font-semibold text-primary-900">
              {t('common:description')}:
            </h2>
            <p className="text-base leading-6 text-gray-500 w-full mt-4">
              {data.description}
            </p>
          </div>
        </div>
        <div className="mt-10 flex-col md:w-[50%]">
          <h2 className="mt-10 text-lg font-semibold text-primary-900">
            {t('profilePet:QRCode')}:
          </h2>
          <div className="flex-row gap-4 mt-4 md:flex ">
            <img
              alt="qrCode"
              src={`${import.meta.env.VITE_BUCKET_NAME}qrCode/${data.qrCode}`}
              className="min-h-[150px] min-w-[150px] max-h-[150px] max-w-[150px]"
            />
            <p className="text-base leading-6 text-gray-500 w-full">
              {t('profilePet:QRCodeDescription')}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
